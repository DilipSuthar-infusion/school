<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

=======
import React, { useState, useEffect, useMemo } from "react";
import useClassApi from "../../hooks/useClassApi";
import useUserApi from "../../hooks/useUserApi";
import useAttendenceApi from "../../hooks/useAttendenceApi";
import { SquarePen } from "lucide-react";
>>>>>>> cd66348 (new CssAdd)

const ManageAttendance = () => {
  const { Classes } = useClassApi();
  const { users } = useUserApi();
  const { attendance } = useAttendenceApi();

  const [classId, setClassId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filtered, setFiltered] = useState([]);

  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  const { percentage } = useMemo(() => {
    const result = filtered.reduce(
      (acc, curr) => {
        if (curr.status === "present") acc.present++;
        if (curr.status === "present" || curr.status === "absent") acc.total++;
        return acc;
      },
      { total: 0, present: 0 }
    );
  
    const percentage = result.total > 0 
      ? Math.round((result.present / result.total) * 100) 
      : 0;
  
    return { ...result, percentage };
  }, [filtered]);
  

  useEffect(() => {
    let result = attendance || [];

    if (classId) {
      result = result.filter((att) => att.classId === classId);
    }
    if (selectedMonth) {
      result = result.filter(
        (att) => new Date(att.date).getMonth() + 1 === selectedMonth
      );
    }
    if (selectedYear) {
      result = result.filter(
        (att) => new Date(att.date).getFullYear() === selectedYear
      );
    }

    setFiltered(result);
  }, [attendance, classId, selectedMonth, selectedYear]);

  return (
    <div className=" p-2">
      <h2 className="text-xl md:text-3xl flex items-center gap-2 mb-5 ">
        <SquarePen className="w-6 " /> Attendance Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 bg-white md:p-5 p-2 rounded-lg shadow-lg">
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border-1 border-gray-200 bg-gray-100 appearance-none outline-0 px-4 py-1 md:py-2 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Class</option>
          {Classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.classname}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border-1 border-gray-200 bg-gray-100 appearance-none outline-0 px-4 py-1 md:py-2 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border-1 border-gray-200 bg-gray-100 appearance-none outline-0 px-4 py-1 md:py-2 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {[...Array(3)].map((_, i) => {
            const yr = new Date().getFullYear() - 2 + i;
            return (
              <option key={yr} value={yr}>
                {yr}
              </option>
            );
          })}
        </select>
      </div>

      {!classId ? (
        <div className="rounded-lg shadow-lg text-center py-16 bg-white">
          <h3 className="text-lg font-medium text-gray-700">
            Please Select Class
          </h3>
        </div>
      ) : (
        <>
          <h3 className="md:text-xl text-center md:text-left font-semibold mb-2">
            Showing Attendance:{" "}
            <span className="text-blue-600">
              {monthName} {selectedYear}
            </span>
          </h3>
          <div className="w-full overflow-x-auto  rounded-lg shadow-md mt-4">
          <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-sm text-blue-700">
                <th className="px-4 py-2 sticky left-0 bg-blue-100 font-semibold text-left border-r border-blue-100">
                  Student Name
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-2 py-2 text-center border-r border-blue-100"
                  >
                    {day}
                  </th>
                ))}
                <th className="px-2 py-2 text-center border-r border-blue-100">Percentage(%)</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((u) => u.role === "student" && u.classId === classId)
                .map((student, index) => (
                  <tr
                    key={student.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className=" px-4 py-2 sticky left-0 bg-white font-medium text-gray-800">
                      {student.username}
                    </td>
                    {days.map((day) => {
                      const dateStr = `${selectedYear}-${String(
                        selectedMonth
                      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const record = filtered.find(
                        (r) =>
                          r.studentId === student.id &&
                          r.date.startsWith(dateStr)
                      );

                      const status = record?.status;

                      const statusStyle =
                        status === "present"
                          ? "bg-green-100 text-green-700"
                          : status === "absent"
                          ? "bg-red-100 text-red-700"
                          : "text-gray-400";

                      return (
                        <td
                          key={day}
                          className={` px-2 py-1 text-center text-sm font-medium capitalize ${statusStyle}`}
                        >
                          {status === "present"
                            ? "P"
                            : status === "absent"
                            ? "A"
                            : "-"}
                        </td>
                      );
                    })}
                    <td className="px-2 py-1 text-center text-sm font-medium">
                      {percentage}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default ManageAttendence;
=======
export default ManageAttendance;
>>>>>>> cd66348 (new CssAdd)
