import { useAuth } from '../../Context/Authcontext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const groupByMonth = (records) => {
  const grouped = Array.from({ length: 12 }, () => []);
  records.forEach((record) => {
    const month = new Date(record.date).getMonth();
    grouped[month].push(record);
  });
  return grouped;
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AttendanceView = () => {
  const { user } = useAuth();
  const [attendanceByMonth, setAttendanceByMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expandedMonth, setExpandedMonth] = useState(null);


  const yearOptions = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/attendance/${user.id}/year/${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const grouped = groupByMonth(res.data);
          setAttendanceByMonth(grouped);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load attendance data');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, selectedYear]);

  const calculateAttendanceRate = (records) => {
    if (records.length === 0) return 0;
    const presentCount = records.filter(r => r.status === "present").length;
    return Math.round((presentCount / records.length) * 100);
  };

  const getAttendanceColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (rate) => {
    if (rate >= 90) return 'bg-green-500';
    if (rate >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Calculate overall statistics
  const totalRecords = attendanceByMonth.flat().length;
  const totalPresent = attendanceByMonth.flat().filter(r => r.status === "present").length;
  const overallRate = totalRecords > 0 ? Math.round((totalPresent / totalRecords) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-indigo-600 font-medium">Loading attendance data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">Error Loading Data</div>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Overview</h1>
              <p className="text-gray-600">Track your attendance across the year</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Year Selector */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Overall Statistics */}
          {totalRecords > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="text-sm opacity-90">Total Days</div>
                <div className="text-2xl font-bold">{totalRecords}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
                <div className="text-sm opacity-90">Present Days</div>
                <div className="text-2xl font-bold">{totalPresent}</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-white">
                <div className="text-sm opacity-90">Overall Rate</div>
                <div className="text-2xl font-bold">{overallRate}%</div>
              </div>
            </div>
          )}
        </div>

        {/* Monthly Attendance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {attendanceByMonth.map((records, index) => {
            const presentCount = records.filter((r) => r.status === "present").length;
            const absentCount = records.filter((r) => r.status === "absent").length;
            const attendanceRate = calculateAttendanceRate(records);
            const isExpanded = expandedMonth === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Month Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{monthNames[index]}</h3>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Rate</div>
                      <div className={`text-xl font-bold ${records.length > 0 ? 'text-white' : 'text-gray-300'}`}>
                        {records.length > 0 ? `${attendanceRate}%` : 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {records.length > 0 && (
                    <div className="mt-3">
                      <div className="bg-white bg-opacity-30 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ width: `${attendanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Month Content */}
                <div className="p-4">
                  {records.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">📅</div>
                      <p className="text-gray-400 italic">No records for this month</p>
                    </div>
                  ) : (
                    <>
                      {/* Summary Stats */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-700 font-medium">{presentCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-red-700 font-medium">{absentCount}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedMonth(isExpanded ? null : index)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>

                      {/* Detailed Records */}
                      {isExpanded && (
                        <div className="border-t pt-4">
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {records
                              .sort((a, b) => new Date(b.date) - new Date(a.date))
                              .map((record) => (
                              <div
                                key={record.id}
                                className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                                  record.status === "present"
                                    ? "bg-green-50 border-green-500"
                                    : "bg-red-50 border-red-500"
                                }`}
                              >
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {format(new Date(record.date), "dd MMM yyyy")}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {format(new Date(record.date), "EEEE")}
                                  </div>
                                </div>
                                <div
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    record.status === "present"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {record.status.toUpperCase()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {totalRecords === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Attendance Data</h3>
            <p className="text-gray-600">No attendance records found for {selectedYear}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceView;