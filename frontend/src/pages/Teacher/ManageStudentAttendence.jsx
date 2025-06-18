import React, { useEffect, useState } from "react";
import useAttendanceApi from "../../hooks/useAttendenceApi";
import useClassApi from "../../hooks/useClassApi";
import useUserApi from "../../hooks/useUserApi";
import { useAuth } from "../../Context/Authcontext";
import { BookCopy, Calendar, Users, CheckCircle, XCircle } from "lucide-react";

const ManageStudentAttendence = ({ teacherId }) => {
  const { markBulkAttendance } = useAttendanceApi();
  const { Classes } = useClassApi();
  const { users } = useUserApi();
  const { user } = useAuth();

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [date, setDate] = useState("");

  const fetchStudents = async () => {
    if (!selectedClassId || !date) return;
    setStudents(
      users.filter(
        (user) =>
          user.role === "student" &&
          user.classId === (selectedClassId.id || selectedClassId)
      )
    );
  };

  const handleInput = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.studentId === id || s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  const handleSubmit = async () => {
    await markBulkAttendance(
      selectedClassId,
      date,
      students.map((s) => ({
        studentId: s.id,
        status: s.status || "present",
      }))
    );
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClassId, date]);

  const presentCount = students.filter(s => s.status === "present").length;
  const absentCount = students.filter(s => s.status === "absent").length;
  const totalStudents = students.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center text-white">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <BookCopy className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Manage Attendance</h1>
                  <p className="text-blue-100 mt-1">Track student presence efficiently</p>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative">
                  <select
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full sm:w-auto bg-white/90 backdrop-blur text-gray-800 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg appearance-none cursor-pointer min-w-[180px]"
                  >
                    <option value="">Select Class</option>
                    {Classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.classname}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full sm:w-auto bg-white/90 backdrop-blur text-gray-800 pl-12 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg min-w-[180px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          {students.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-medium">Total Students: {totalStudents}</span>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Present: {presentCount}</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Absent: {absentCount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student List */}
        {students.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Desktop/Tablet Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="text-left p-4 font-semibold">Student Name</th>
                    <th className="text-left p-4 font-semibold">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((s, index) => (
                    <tr
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                      key={s.studentId || s.id}
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {s.username.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">{s.username}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <label
                            className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                              s.status === "present"
                                ? "bg-green-100 text-green-700 border-2 border-green-200 shadow-md"
                                : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-green-50 hover:text-green-600"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`status-${s.id}`}
                              value="present"
                              checked={s.status === "present"}
                              onChange={(e) =>
                                handleInput(s.id, "status", e.target.value)
                              }
                              className="sr-only"
                            />
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="font-medium">Present</span>
                          </label>

                          <label
                            className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                              s.status === "absent"
                                ? "bg-red-100 text-red-700 border-2 border-red-200 shadow-md"
                                : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`status-${s.id}`}
                              value="absent"
                              checked={s.status === "absent"}
                              onChange={(e) =>
                                handleInput(s.id, "status", e.target.value)
                              }
                              className="sr-only"
                            />
                            <XCircle className="w-5 h-5 mr-2" />
                            <span className="font-medium">Absent</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-100">
              {students.map((s, index) => (
                <div key={s.studentId || s.id} className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {s.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900 text-lg">{s.username}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <label
                      className={`flex-1 flex items-center justify-center px-3 py-3 rounded-xl cursor-pointer transition-all ${
                        s.status === "present"
                          ? "bg-green-100 text-green-700 border-2 border-green-200 shadow-md"
                          : "bg-gray-100 text-gray-600 border-2 border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`status-${s.id}`}
                        value="present"
                        checked={s.status === "present"}
                        onChange={(e) =>
                          handleInput(s.id, "status", e.target.value)
                        }
                        className="sr-only"
                      />
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Present</span>
                    </label>

                    <label
                      className={`flex-1 flex items-center justify-center px-3 py-3 rounded-xl cursor-pointer transition-all ${
                        s.status === "absent"
                          ? "bg-red-100 text-red-700 border-2 border-red-200 shadow-md"
                          : "bg-gray-100 text-gray-600 border-2 border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`status-${s.id}`}
                        value="absent"
                        checked={s.status === "absent"}
                        onChange={(e) =>
                          handleInput(s.id, "status", e.target.value)
                        }
                        className="sr-only"
                      />
                      <XCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Absent</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

              
            <div className="p-6 bg-gray-50 border-t">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Submit Attendance
              </button>
            </div>
          </div>
        )}

   
        {(!selectedClassId || !date) && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookCopy className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Class and Date</h3>
            <p className="text-gray-600">Choose a class and date to view and manage student attendance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudentAttendence;