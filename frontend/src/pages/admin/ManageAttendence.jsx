import React, { useEffect, useState } from 'react';
import useAttendanceApi from '../../hooks/useAttendenceApi';

const ManageAttendence = () => {
//   const { getAllAttendance } = useAttendanceApi();
  const [records, setRecords] = useState([]);

//   useEffect(() => {
//     const fetchRecords = async () => {
//       const res = await getAllAttendance();
//       setRecords(res.data);
//     };
//     fetchRecords();
//   }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Attendance Records</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Marked By</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id}>
              <td className="border p-2">{rec.student?.name}</td>
              <td className="border p-2">{rec.class?.name}</td>
              <td className="border p-2">{rec.date}</td>
              <td className="border p-2">{rec.status}</td>
              <td className="border p-2">{rec.marker?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAttendence;