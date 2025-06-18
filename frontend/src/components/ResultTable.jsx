import React from 'react';

const calculateGrade = (marks) => {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  return 'F';
};

const ResultTable = ({ students, onMarksChange, onSave }) => {
  return (
    <table className="w-full border text-sm mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">#</th>
          <th className="border p-2">Student</th>
          <th className="border p-2">Marks</th>
          <th className="border p-2">Grade</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((stu, index) => {
          const grade = calculateGrade(stu.marks);
          return (
            <tr key={stu.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{stu.name}</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-20 border p-1 rounded"
                  value={stu.marks}
                  onChange={(e) => onMarksChange(stu.id, parseInt(e.target.value) || 0)}
                  min={0}
                  max={100}
                />
              </td>
              <td className="border p-2 font-semibold">{grade}</td>
              <td className="border p-2">
                <button
                  onClick={() => onSave(stu)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultTable;
