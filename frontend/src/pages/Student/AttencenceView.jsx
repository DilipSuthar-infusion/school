import React, { useEffect, useState } from "react";
import useAttendanceApi from "../../hooks/useAttendenceApi";
import useClassApi from "../../hooks/useClassApi";
import { useAuth } from "../../Context/Authcontext";
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Award,
  Target,
  BookOpen
} from "lucide-react";

const AttencenceView = () => {
  const { getStudentAttendance } = useAttendanceApi();
  const { Classes } = useClassApi();
  const { user } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const monthStart = new Date(selectedYear, selectedMonth, 1);
    const firstDayOfWeek = monthStart.getDay();
    
    return { daysInMonth, firstDayOfWeek };
  };

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const data = await getStudentAttendance(user.id, selectedMonth, selectedYear);
      
      // Mock data for demonstration
      const { daysInMonth } = getMonthData();
      const mockData = {
        studentId: user.id,
        studentName: user.username || user.name,
        className: Classes.find(c => c.id === user.classId)?.classname || 'N/A',
        rollNumber: user.rollNumber || 'N/A',
        days: {}
      };

      // Generate mock attendance for each day
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, selectedMonth, day);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        
        if (!isWeekend && date <= new Date()) {
          mockData.days[day] = Math.random() > 0.15 ? 'present' : 'absent';
        }
      }

      setAttendanceData(mockData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAttendanceData();
    }
  }, [selectedMonth, selectedYear, user]);

  const calculateStats = () => {
    if (!attendanceData) return { present: 0, absent: 0, total: 0, percentage: 0 };
    
    const days = Object.values(attendanceData.days);
    const present = days.filter(d => d === 'present').length;
    const absent = days.filter(d => d === 'absent').length;
    const total = present + absent;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    return { present, absent, total, percentage };
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const getAttendanceGrade = (percentage) => {
    if (percentage >= 95) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 85) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 75) return { grade: 'C+', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const stats = calculateStats();
  const attendanceGrade = getAttendanceGrade(stats.percentage);
  const { daysInMonth, firstDayOfWeek } = getMonthData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center text-white">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">My Attendance</h1>
                  <p className="text-blue-100 mt-1">Track your attendance record</p>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="px-4 py-2 text-white font-medium min-w-[150px] text-center">
                  {months[selectedMonth]} {selectedYear}
                </span>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Student Info Bar */}
          {attendanceData && (
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {attendanceData.studentName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{attendanceData.studentName}</h3>
                    <p className="text-gray-600">{attendanceData.className} • Roll No: {attendanceData.rollNumber}</p>
                  </div>
                </div>
                
                {/* Grade Badge */}
                <div className={`${attendanceGrade.bg} ${attendanceGrade.color} px-4 py-2 rounded-xl flex items-center`}>
                  <Award className="w-5 h-5 mr-2" />
                  <span className="font-bold">Grade: {attendanceGrade.grade}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your attendance...</p>
          </div>
        ) : attendanceData ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Present Days</p>
                    <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Absent Days</p>
                    <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Attendance %</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.percentage}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Target</p>
                    <p className="text-2xl font-bold text-purple-600">85%</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                {/* Week Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-600 py-3 bg-gray-50 rounded-lg">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDayOfWeek }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}
                  
                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const date = new Date(selectedYear, selectedMonth, day);
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    const isFuture = date > new Date();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const status = attendanceData.days[day];
                    
                    let cellClass = "aspect-square flex items-center justify-center rounded-xl font-bold text-lg transition-all transform hover:scale-105 ";
                    
                    if (isToday) {
                      cellClass += "ring-4 ring-blue-300 ";
                    }
                    
                    if (isFuture) {
                      cellClass += "bg-gray-100 text-gray-400";
                    } else if (isWeekend) {
                      cellClass += "bg-gray-200 text-gray-500";
                    } else if (status === 'present') {
                      cellClass += "bg-green-100 text-green-700 border-2 border-green-300 shadow-md";
                    } else if (status === 'absent') {
                      cellClass += "bg-red-100 text-red-700 border-2 border-red-300 shadow-md";
                    } else {
                      cellClass += "bg-gray-100 text-gray-600";
                    }

                    return (
                      <div key={day} className={cellClass}>
                        <span>{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend and Progress */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded mr-2"></div>
                      <span className="text-gray-600">Present</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded mr-2"></div>
                      <span className="text-gray-600">Absent</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                      <span className="text-gray-600">Weekend</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-300 rounded mr-2 ring-2 ring-blue-300"></div>
                      <span className="text-gray-600">Today</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Progress to 85%:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((stats.percentage / 85) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.min(Math.round((stats.percentage / 85) * 100), 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Message */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center">
                {stats.percentage >= 85 ? (
                  <div className="text-green-600">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Excellent Attendance! 🎉</h3>
                    <p className="text-gray-600">Keep up the great work! Your consistent attendance shows dedication.</p>
                  </div>
                ) : stats.percentage >= 75 ? (
                  <div className="text-yellow-600">
                    <Target className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Good Progress! 📈</h3>
                    <p className="text-gray-600">You're doing well! Try to maintain regular attendance to reach 85%.</p>
                  </div>
                ) : (
                  <div className="text-red-600">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Needs Improvement 💪</h3>
                    <p className="text-gray-600">Focus on improving your attendance. Every day counts towards your success!</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Attendance Data</h3>
            <p className="text-gray-600">No attendance records found for this month.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttencenceView;