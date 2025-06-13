import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Clock, Pen, User } from "lucide-react";
import useClassApi from "../../hooks/useClassApi";
import useSubjectApi from "../../hooks/useSubjectApi";
import useExamApi from "../../hooks/useExamApi";

const ManageExam = () => {
  const { handleAddExam, exams, handleDeleteExam } = useExamApi();
  const { Classes } = useClassApi();
  const { subjects } = useSubjectApi();

  const [examInfo, setExamInfo] = useState({
    examName: "",
    examDate: "",
    examTime: "",
    classId: "",
    subjectId: "",
  });

  const [selectedClassId, setSelectedClassId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassChange = (e) => {
    const { value } = e.target;
    setSelectedClassId(value);
    setExamInfo((prev) => ({ ...prev, classId: value })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddExam(examInfo);
      alert("Exam created successfully!");
      setExamInfo({
        examName: "",
        examDate: "",
        examTime: "",
        classId: "",
        subjectId: "",
      });
    } catch (error) {
      console.error("Error creating exam:", error);
      alert(error.response.data.error || "Error creating exam");
    }
  };




  const filteredExams = exams.filter((exam) => exam.classId === selectedClassId);

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow overflow-x-auto" >
      <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User  className="w-4 h-4 text-blue-600 float-left me-1" />
              Exam Name
            </label>
            <input
              type="text"
              name="examName"
              value={examInfo.examName}
              onChange={handleInputChange}
              placeholder="Yearly Exam"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600 float-left me-1" />
              Exam Date
            </label>
            <input
              type="date"
              name="examDate"
              value={examInfo.examDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4 text-blue-600 float-left me-1" />
              Exam Time
            </label>
            <input
              type="time"
              name="examTime"
              value={examInfo.examTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Pen className="w-4 h-4 text-blue-600 float-left me-1" />
              Class Name
            </label>
            <select
              name="classId"
              value={selectedClassId}
              onChange={handleClassChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
              required
            >
              <option value="">Select Class</option>
              {Classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.classname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <BookOpen className="w-4 h-4 text-blue-600 float-left me-1" />
              Subject Name
            </label>
            <select
              name="subjectId"
              value={examInfo.subjectId}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subjectName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200"
          >
            + Create Exam
          </button>
        </div>
      </form>
    {selectedClassId && <>
      <h2 className="text-xl font-bold mb-4">Exams List for {Classes.find(c => c.id === selectedClassId)?.classname || "Selected Class"}</h2>
      <table className=" overflow-x-auto w-full">
        <thead className=" bg-blue-50 text-left text-blue-600 font-semibold">
          <tr>
            <th className="px-4 py-2">Exam Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Class Name</th>
            <th className="px-4 py-2">Subject Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExams.map((exam) => (
            <tr key={exam.id}>
              <td className="border border-gray-300 px-4 py-2">{exam.examName}</td>
              <td className="border border-gray-300 px-4 py-2">{exam.examDate}</td>
              <td className="border border-gray-300 px-4 py-2">{exam.examTime}</td>
              <td className="border border-gray-300 px-4 py-2">
                {Classes.find(c => c.id === exam.classId)?.classname || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {subjects.find(s => s.id === exam.subjectId)?.subjectName || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleDeleteExam(exam.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> </>}
    </div>
  );
};

export default ManageExam;
