import React, { useState, useEffect, useMemo } from 'react';
import useClassApi from '../../hooks/useClassApi';
import useUserApi from '../../hooks/useUserApi';
import axios from 'axios';


const AttendanceDashboard = () => {
  const { Classes } = useClassApi();
  const { users } = useUserApi();

  const [classId, setClassId] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ present: 0, absent: 0, percentage: 0 });

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth, 0).getDate();
  }, [selectedMonth, selectedYear]);

  const monthName = useMemo(() => {
    return new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' });
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!classId) return;

      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance`, {
          params: {
            classId,
            month: selectedMonth,
            year: selectedYear,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAttendance(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [classId, selectedMonth, selectedYear]);

  const calculateStats = (attendanceData) => {
    let presentCount = 0;
    let absentCount = 0;
    let totalRecords = 0;

    attendanceData.forEach(record => {
      if (record.status === 'present') presentCount++;
      if (record.status === 'absent') absentCount++;
      if (record.status) totalRecords++;
    });

    const percentage = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

    setStats({
      present: presentCount,
      absent: absentCount,
      percentage
    });
  };
  const students = useMemo(() => users.filter((u) => u.role === 'student' && u.classId === classId)
  
  , [users, Classes, classId]);




  const attendanceMap = useMemo(() => {
    const map = {};
    students.forEach((student) => {
      map[student.id] = Array(daysInMonth).fill(null);
    });

    attendance.forEach((record) => {
      const dateObj = new Date(record.date);
      const recordMonth = dateObj.getMonth() + 1;
      const recordYear = dateObj.getFullYear();

      if (
        recordMonth === Number(selectedMonth) &&
        recordYear === Number(selectedYear)
      ) {
        const day = dateObj.getDate();
        if (map[record.studentId] && day <= daysInMonth) {
          map[record.studentId][day - 1] = record.status;
        }
      }
    });

    return map;
  }, [attendance, students, selectedMonth, selectedYear, daysInMonth]);

  const getStudentStats = (studentId) => {
    const records = attendanceMap[studentId] || [];
    const present = records.filter((r) => r === 'present').length;
    const absent = records.filter((r) => r === 'absent').length;
    const total = present + absent;
    const percent = total > 0 ? Math.round((present / total) * 100) : 0;
    return { present, absent, total, percent };
  };

  const handleStatusChange = async (studentId, day, newStatus) => {
    const date = new Date(selectedYear, selectedMonth - 1, day + 1).toISOString().split('T')[0];
    const existingRecord = attendance.find(
      r => r.studentId === studentId && r.date.includes(date)
    );

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (existingRecord) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/attendance/${existingRecord.id}`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/attendance`,
          {
            studentId,
            classId,
            date,
            status: newStatus,
            markedBy: 'teacher'
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Refresh data
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/attendance`, {
        params: { classId, month: selectedMonth, year: selectedYear },
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Failed to update attendance:', error);
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Attendance Dashboard</h2>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Class</option>
              {Classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.classname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {classId && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">{students.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Present</p>
              <p className="text-2xl font-bold text-gray-800">{stats.present}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <FiXCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Absent</p>
              <p className="text-2xl font-bold text-gray-800">{stats.absent}</p>
            </div>
          </div>
        </div>
      )}

      {classId ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              {monthName} {selectedYear} Attendance
            </h3>
            <div className="flex items-center mt-1">
              <div className="p-1 rounded-full bg-blue-100 text-blue-600 mr-2">
                <FiPercent size={14} />
              </div>
              <span className="text-sm text-gray-600">
                Class Average: {stats.percentage}%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                    Student
                  </th>
                  {Array.from({ length: daysInMonth }).map((_, i) => (
                    <th
                      key={i + 1}
                      className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {i + 1}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => {
                  const statusArray = attendanceMap[student.id] || [];
                  const { present, total, percent } = getStudentStats(student.id);

                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                            {student.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 mb-2">{student.username}</div>
                            <div className="text-xs text-gray-500">Roll: {student.admissionNumber || '-'}</div>
                          </div>
                        </div>
                      </td>
                      {statusArray.map((status, i) => (
                        <td
                          key={i}
                          className="text-center px-2 py-2"
                        >
                          <button
                            onClick={() => handleStatusChange(
                              student.id, 
                              i + 1, 
                              status === 'present' ? 'absent' : 'present'
                            )}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              status === 'present'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : status === 'absent'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            {status === 'present' ? 'P' : status === 'absent' ? 'A' : '-'}
                          </button>
                        </td>
                      ))}
                      <td className="text-center px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {present}/{total}
                        </span>
                      </td>
                      <td className="text-center px-4 py-4 whitespace-nowrap text-sm font-bold">
                        <span className={`px-2 py-1 rounded-full ${
                          percent >= 75 ? 'bg-green-100 text-green-800' :
                          percent >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {percent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mx-auto max-w-md">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Select a class</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a class from the dropdown above to view and manage attendance records.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDashboard;