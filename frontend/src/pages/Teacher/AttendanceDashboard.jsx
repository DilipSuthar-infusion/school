import React, { useEffect, useState } from "react";
import useAttendanceApi from "../../hooks/useAttendenceApi";
import useClassApi from "../../hooks/useClassApi";
import useUserApi from "../../hooks/useUserApi";
import { useAuth } from "../../Context/Authcontext";
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  User, 
  TrendingUp, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye
} from "lucide-react";

const AttendanceDashboard = () => {
  const { getAttendanceData } = useAttendanceApi();
  const { Classes } = useClassApi();
  const { users } = useUserApi();
  const { user } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get current user role and permissions
  const userRole = user?.role?.toLowerCase();
  const isStudent = userRole === 'student';
  const isParent = userRole === 'parent';
  const isTeacher = userRole === 'teacher';
  const isAdmin = userRole === 'admin';

  // Filter options based on user role
  const canSelectClass = isTeacher || isAdmin;
  const canSelectStudent = isParent || isAdmin || isTeacher;
  const showOnlyOwnData = isStudent || isParent;

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

  // Mock attendance data - replace with actual API call
  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const data = await getAttendanceData(selectedMonth, selectedYear, selectedClassId, selectedStudentId);
      
      // Mock data for demonstration
      const mockData = [];
      const { daysInMonth } = getMonthData();
      
      let studentsToShow = [];
      
      if (showOnlyOwnData) {
        // For students, show only their data
        // For parents, show only their children's data
        if (isStudent) {
          studentsToShow = [user];
        } else if (isParent) {
          // Assuming parent has children property or similar
          studentsToShow = users.filter(u => u.parentId === user.id);
        }
      } else {
        // For teachers and admins
        studentsToShow = users.filter(u => {
          if (u.role !== 'student') return false;
          if (selectedClassId && u.classId !== selectedClassId) return false;
          if (selectedStudentId && u.id !== selectedStudentId) return false;
          return true;
        });
      }

      studentsToShow.forEach(student => {
        const studentAttendance = {
          studentId: student.id,
          studentName: student.username || student.name,
          className: Classes.find(c => c.id === student.classId)?.classname || 'N/A',
          days: {}
        };

        // Generate mock attendance for each day
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(selectedYear, selectedMonth, day);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          
          if (!isWeekend && date <= new Date()) {
            studentAttendance.days[day] = Math.random() > 0.2 ? 'present' : 'absent';
          }
        }
        
        mockData.push(studentAttendance);
      });

      setAttendanceData(mockData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedMonth, selectedYear, selectedClassId, selectedStudentId, user]);

  const calculateStats = (studentData) => {
    const days = Object.values(studentData.days);
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

  const { daysInMonth, firstDayOfWeek } = getMonthData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center text-white">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {isStudent ? 'My Attendance' : 
                     isParent ? 'Child Attendance' : 
                     'Attendance Dashboard'}
                  </h1>
                  <p className="text-blue-100 mt-1">Monthly attendance overview</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
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

                {/* Class Filter - Only for teachers and admins */}
                {canSelectClass && (
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="bg-white/90 backdrop-blur text-gray-800 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                  >
                    <option value="">All Classes</option>
                    {Classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.classname}
                      </option>
                    ))}
                  </select>
                )}

                {/* Student Filter - For parents, teachers and admins */}
                {canSelectStudent && !isParent && (
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="bg-white/90 backdrop-blur text-gray-800 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                  >
                    <option value="">All Students</option>
                    {users.filter(u => u.role === 'student').map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.username || student.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading attendance data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {attendanceData.map((studentData) => {
              const stats = calculateStats(studentData);
              
              return (
                <div key={studentData.studentId} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  {/* Student Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                          {studentData.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{studentData.studentName}</h3>
                          <p className="text-gray-600">{studentData.className}</p>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center bg-green-100 px-4 py-2 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-700 font-medium">{stats.present} Present</span>
                        </div>
                        <div className="flex items-center bg-red-100 px-4 py-2 rounded-xl">
                          <XCircle className="w-5 h-5 text-red-600 mr-2" />
                          <span className="text-red-700 font-medium">{stats.absent} Absent</span>
                        </div>
                        <div className="flex items-center bg-blue-100 px-4 py-2 rounded-xl">
                          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-blue-700 font-medium">{stats.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="p-6">
                    {/* Week Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-medium text-gray-500 py-2">
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
                        const status = studentData.days[day];
                        
                        let cellClass = "aspect-square flex items-center justify-center rounded-xl font-medium transition-all ";
                        
                        if (isFuture) {
                          cellClass += "bg-gray-100 text-gray-400";
                        } else if (isWeekend) {
                          cellClass += "bg-gray-200 text-gray-500";
                        } else if (status === 'present') {
                          cellClass += "bg-green-100 text-green-700 border-2 border-green-200";
                        } else if (status === 'absent') {
                          cellClass += "bg-red-100 text-red-700 border-2 border-red-200";
                        } else {
                          cellClass += "bg-gray-100 text-gray-600";
                        }

                        return (
                          <div key={day} className={cellClass}>
                            <span className="text-sm sm:text-base">{day}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-100 border-2 border-green-200 rounded mr-2"></div>
                        <span className="text-gray-600">Present</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-100 border-2 border-red-200 rounded mr-2"></div>
                        <span className="text-gray-600">Absent</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                        <span className="text-gray-600">Weekend</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
                        <span className="text-gray-600">Future/No Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {attendanceData.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Attendance Data</h3>
                <p className="text-gray-600">No attendance records found for the selected criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceDashboard;