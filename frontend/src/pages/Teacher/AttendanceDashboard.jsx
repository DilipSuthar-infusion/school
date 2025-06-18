import React, { useEffect, useState } from "react";
import useAttendanceApi from "../../hooks/useAttendenceApi";
import useClassApi from "../../hooks/useClassApi";
import useUserApi from "../../hooks/useUserApi";
import { useAuth } from "../../Context/Authcontext";

const AttendanceDashboard = () => {
  const { attendance,  deleteAttendanceByStudent } = useAttendanceApi();
  const { Classes } = useClassApi();
  const { users } = useUserApi();
  const { user } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedClassId, setSelectedClassId] = useState("");

  const isTeacher = user?.role === "teacher" || user?.role === "admin";



  const handleDeleteAttendance = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student's attendance for this month?")) {
      await deleteAttendanceByStudent({
        studentId,
        month: selectedMonth,
        year: selectedYear,
      });
      await getAttendanceData({
        month: selectedMonth,
        year: selectedYear,
        classId: selectedClassId,
      });
    }
  };

  const filteredStudents = users.filter(
    (u) => u.role === "student" && (!selectedClassId || u.classId === selectedClassId)
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Attendance Dashboard</h1>

      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          className="border p-2 rounded"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option value="">Select Class</option>
          {Classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.classname}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto">
        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Student Name</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Total Days</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">Absent</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              const record = attendance.find((a) => a.studentId === student.id);
              const total = Object.keys(record?.days || {}).length;
              const present = Object.values(record?.days || {}).filter((d) => d === "present").length;
              const absent = Object.values(record?.days || {}).filter((d) => d === "absent").length;

              return (
                <tr key={student.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{student.username || student.name}</td>
                  <td className="p-2 border">{Classes.find((c) => c.id === student.classId)?.classname}</td>
                  <td className="p-2 border">{total}</td>
                  <td className="p-2 border text-green-700">{present}</td>
                  <td className="p-2 border text-red-700">{absent}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDeleteAttendance(student.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-600">
                  No students found for the selected class.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
