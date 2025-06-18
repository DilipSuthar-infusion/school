import React from 'react';

const ResultFilter = ({ filters, onChange }) => {
  return (
    <div className="flex gap-4 mb-4">
      <select name="classId" onChange={onChange} value={filters.classId} className="border p-2 rounded">
        <option value="">Select Class</option>
        <option value="1">Class 1</option>
        <option value="2">Class 2</option>
      </select>

      <select name="subjectId" onChange={onChange} value={filters.subjectId} className="border p-2 rounded">
        <option value="">Select Subject</option>
        <option value="math">Math</option>
        <option value="science">Science</option>
      </select>

      <select name="examType" onChange={onChange} value={filters.examType} className="border p-2 rounded">
        <option value="">Select Exam</option>
        <option value="midterm">Midterm</option>
        <option value="final">Final</option>
      </select>
    </div>
  );
};

export default ResultFilter;
