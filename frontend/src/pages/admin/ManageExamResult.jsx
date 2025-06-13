import React, { useState, useEffect } from "react";
import useExamResultApi from "../../hooks/useExamResultApi"; // Your custom hook for exam results
import useExamApi from "../../hooks/useExamApi"; // Custom hook to get exams
import useUserApi from "../../hooks/useUserApi"; // Custom hook to get users/students
import useSubjectApi from "../../hooks/useSubjectApi"; // Custom hook to get subjects
import useFeeAssignApi from "../../hooks/useFeeAssignApi";

const ManageExamResult = () => {
//   const {  } = useExamResultApi(); // Assuming createResult is a function in your custom hook
  const { exams } = useExamApi();
  const { users } = useUserApi();
  const { subjects } = useSubjectApi();
  const {feeAssign} = useFeeAssignApi()
  const [selectedExamId, setSelectedExamId] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [averageMarks, setAverageMarks] = useState(0);

  useEffect(() => {
    if (selectedExamId) {
      const relatedSubjects = subjects.filter(subject => subject.examId === selectedExamId);
      const initialMarksData = relatedSubjects.map(subject => ({
        subjectId: subject.id,
        marksObtained: "",
        remarks: "",
      }));
      setMarksData(initialMarksData);
    }
  }, [selectedExamId, subjects]);

  const handleMarksChange = (index, field, value) => {
    setMarksData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });

    // Calculate total and average marks
    const marksArray = updated.map(mark => parseFloat(mark.marksObtained) || 0);
    const total = marksArray.reduce((acc, curr) => acc + curr, 0);
    const average = marksArray.length ? (total / marksArray.length).toFixed(2) : 0;

    setTotalMarks(total);
    setAverageMarks(average);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const mark of marksData) {
        if (mark.marksObtained) {
          await createResult({
            examId: selectedExamId,
            studentId,
            subjectId: mark.subjectId,
            marksObtained: mark.marksObtained,
            remarks: mark.remarks,
          });
        }
      }
      alert("Results created successfully!");
      setMarksData([]);
      setStudentId("");
      setSelectedExamId("");
      setTotalMarks(0);
      setAverageMarks(0);
    } catch (error) {
      alert(error?.message || "Failed to create results");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Manage Exam Results</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid gap-4">
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>{exam.examName}</option>
            ))}
          </select>

          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Student</option>
            {users.filter((user) => user.role === "student").map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>

        {marksData.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Enter Marks for Subjects</h3>
            {marksData.map((mark, index) => (
              <div key={mark.subjectId} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    {subjects.find(subject => subject.id === mark.subjectId)?.subjectName}
                  </label>
                  <input
                    type="number"
                    value={mark.marksObtained}
                    onChange={(e) => handleMarksChange(index, 'marksObtained', e.target.value)}
                    placeholder="Marks Obtained"
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Remarks</label>
                  <input
                    type="text"
                    value={mark.remarks}
                    onChange={(e) => handleMarksChange(index, 'remarks', e.target.value)}
                    placeholder="Remarks (Optional)"
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            ))}
            <div className="mt-4">
              <h4 className="font-semibold">Total Marks: {totalMarks}</h4>
              <h4 className="font-semibold">Average Marks: {averageMarks}</h4>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Results
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Results List</h2>
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">Exam</th>
            <th className="border border-gray-300 px-3 py-2">Student</th>
            <th className="border border-gray-300 px-3 py-2">Subject</th>
            <th className="border border-gray-300 px-3 py-2">Marks</th>
            <th className="border border-gray-300 px-3 py-2">Remarks</th>
            <th className="border border-gray-300 px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
         {feeAssign.map((fee)=>{
          return (
            <>
            <tr>
            <th>{fee.feeType}</th>
            <th>{fee.amount}</th>
            <th>{fee.dueDate}</th>
            <th>{fee.status}</th>
            </tr>
              
      
            </>
         
          )
         })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageExamResult;
