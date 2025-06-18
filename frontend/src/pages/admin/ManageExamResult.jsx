import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Eye, Calculator, BookOpen, Users, Award, TrendingUp, BarChart3, Download, Filter, X, CheckCircle, AlertCircle } from 'lucide-react';

const ManageExamResult = () => {
  // Mock data to make the component functional
  const subjects = [
    { id: 1, name: 'Mathematics', maxMarks: 100 },
    { id: 2, name: 'Physics', maxMarks: 100 },
    { id: 3, name: 'Chemistry', maxMarks: 100 },
    { id: 4, name: 'English', maxMarks: 100 },
    { id: 5, name: 'Biology', maxMarks: 100 }
  ];

  const exams = [
    { id: 1, name: 'Mid-Term Exam', class: '10th Grade', date: '2024-03-15' },
    { id: 2, name: 'Final Exam', class: '10th Grade', date: '2024-06-20' },
    { id: 3, name: 'Unit Test 1', class: '9th Grade', date: '2024-02-10' }
  ];

  const students = [
    { id: 1, name: 'Alice Johnson', rollNo: '001', class: '10th', section: 'A' },
    { id: 2, name: 'Bob Smith', rollNo: '002', class: '10th', section: 'A' },
    { id: 3, name: 'Carol Davis', rollNo: '003', class: '10th', section: 'B' },
    { id: 4, name: 'David Wilson', rollNo: '004', class: '10th', section: 'A' },
    { id: 5, name: 'Eva Brown', rollNo: '005', class: '10th', section: 'B' }
  ];

  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Calculate grade based on percentage
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', points: 10 };
    if (percentage >= 80) return { grade: 'A', points: 9 };
    if (percentage >= 70) return { grade: 'B+', points: 8 };
    if (percentage >= 60) return { grade: 'B', points: 7 };
    if (percentage >= 50) return { grade: 'C+', points: 6 };
    if (percentage >= 40) return { grade: 'C', points: 5 };
    if (percentage >= 33) return { grade: 'D', points: 4 };
    return { grade: 'F', points: 0 };
  };

  // Show notification
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Handle subject selection
  const handleSubjectChange = (subjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Handle marks input
  const handleMarksChange = (studentId, subjectId, value) => {
    setMarks(prev => ({
      ...prev,
      [`${studentId}-${subjectId}`]: Math.min(100, Math.max(0, parseInt(value) || 0))
    }));
  };

  // Generate results
  const generateResults = () => {
    if (!selectedExam || selectedSubjects.length === 0) {
      showNotificationMessage('Please select exam and subjects');
      return;
    }

    const newResults = students.map(student => {
      const studentMarks = selectedSubjects.map(subjectId => {
        const mark = marks[`${student.id}-${subjectId}`] || 0;
        const subject = subjects.find(s => s.id === subjectId);
        const percentage = (mark / subject.maxMarks) * 100;
        const gradeData = calculateGrade(percentage);
       
        return {
          subjectId,
          subjectName: subject.name,
          marks: mark,
          maxMarks: subject.maxMarks,
          percentage: percentage.toFixed(2),
          grade: gradeData.grade,
          points: gradeData.points
        };
      });

      const totalMarks = studentMarks.reduce((sum, sm) => sum + sm.marks, 0);
      const totalMaxMarks = studentMarks.reduce((sum, sm) => sum + sm.maxMarks, 0);
      const overallPercentage = (totalMarks / totalMaxMarks) * 100;
      const overallGrade = calculateGrade(overallPercentage);
      const avgPoints = studentMarks.reduce((sum, sm) => sum + sm.points, 0) / studentMarks.length;

      return {
        id: Date.now() + student.id,
        studentId: student.id,
        studentName: student.name,
        rollNo: student.rollNo,
        class: student.class,
        section: student.section,
        examId: selectedExam,
        examName: exams.find(e => e.id == selectedExam)?.name,
        subjects: studentMarks,
        totalMarks,
        totalMaxMarks,
        percentage: overallPercentage.toFixed(2),
        grade: overallGrade.grade,
        points: avgPoints.toFixed(2),
        status: overallPercentage >= 33 ? 'Pass' : 'Fail',
        generatedAt: new Date().toLocaleDateString()
      };
    });

    setResults(prev => [...prev, ...newResults]);
    setActiveTab('results');
    showNotificationMessage('Results generated successfully!');
  };

  // Filter results based on search
  const filteredResults = results.filter(result =>
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Notification Component
  const Notification = () => (
    showNotification && (
      <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
        <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4 flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-gray-800">{notificationMessage}</span>
          <button
            onClick={() => setShowNotification(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  );

  const Dashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Exams</p>
              <p className="text-4xl font-bold mt-2">{exams.length}</p>
              <div className="flex items-center mt-2 text-blue-200 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </div>
            <div className="bg-blue-500/30 p-3 rounded-xl group-hover:bg-blue-500/40 transition-colors duration-300">
              <BookOpen className="h-8 w-8 text-blue-100" />
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Students</p>
              <p className="text-4xl font-bold mt-2">{students.length}</p>
              <div className="flex items-center mt-2 text-emerald-200 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8% from last month</span>
              </div>
            </div>
            <div className="bg-emerald-500/30 p-3 rounded-xl group-hover:bg-emerald-500/40 transition-colors duration-300">
              <Users className="h-8 w-8 text-emerald-100" />
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Subjects</p>
              <p className="text-4xl font-bold mt-2">{subjects.length}</p>
              <div className="flex items-center mt-2 text-purple-200 text-xs">
                <BarChart3 className="h-3 w-3 mr-1" />
                <span>5 active subjects</span>
              </div>
            </div>
            <div className="bg-purple-500/30 p-3 rounded-xl group-hover:bg-purple-500/40 transition-colors duration-300">
              <BookOpen className="h-8 w-8 text-purple-100" />
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Results Generated</p>
              <p className="text-4xl font-bold mt-2">{results.length}</p>
              <div className="flex items-center mt-2 text-amber-200 text-xs">
                <Award className="h-3 w-3 mr-1" />
                <span>Latest batch processed</span>
              </div>
            </div>
            <div className="bg-amber-500/30 p-3 rounded-xl group-hover:bg-amber-500/40 transition-colors duration-300">
              <Award className="h-8 w-8 text-amber-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveTab('marks')}
            className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-700 transition-colors duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Add New Marks</h3>
                <p className="text-sm text-gray-600">Enter student marks for exams</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className="group p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl transition-all duration-300 hover:scale-105 border border-emerald-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-600 p-3 rounded-lg group-hover:bg-emerald-700 transition-colors duration-300">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">View Results</h3>
                <p className="text-sm text-gray-600">Check generated results</p>
              </div>
            </div>
          </button>

          <button className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 hover:scale-105 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 p-3 rounded-lg group-hover:bg-purple-700 transition-colors duration-300">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Export Reports</h3>
                <p className="text-sm text-gray-600">Download result reports</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const MarksEntry = () => (
    <div className="space-y-8">
      {/* Selection Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Configure Exam & Subjects</h3>
        </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Select Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
            >
              <option value="">Choose an exam...</option>
              {exams.map(exam => (
                <option key={exam.id} value={exam.id}>
                  {exam.name} - {exam.class} ({exam.date})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Select Subjects</label>
            <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto p-4 bg-gray-50 rounded-xl">
              {subjects.map(subject => (
                <label key={subject.id} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-white transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectChange(subject.id)}
                    className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marks Entry Table */}
      {selectedExam && selectedSubjects.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Edit className="h-6 w-6 mr-3" />
              Enter Student Marks
            </h3>
          </div>
         
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 rounded-l-lg">
                      Student Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Roll No
                    </th>
                    {selectedSubjects.map(subjectId => {
                      const subject = subjects.find(s => s.id === subjectId);
                      return (
                        <th key={subjectId} className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                          <div className="flex flex-col">
                            <span>{subject.name}</span>
                            <span className="text-xs text-gray-500 font-normal">Max: {subject.maxMarks}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.class} - {student.section}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-900 bg-gray-50 rounded-lg">
                        {student.rollNo}
                      </td>
                      {selectedSubjects.map(subjectId => (
                        <td key={subjectId} className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={marks[`${student.id}-${subjectId}`] || ''}
                            onChange={(e) => handleMarksChange(student.id, subjectId, e.target.value)}
                            className="w-20 p-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-center font-semibold"
                            placeholder="0"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           
            <div className="mt-8 flex justify-end">
              <button
                onClick={generateResults}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Calculator className="h-5 w-5" />
                <span>Generate Results</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ResultsList = () => (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Generated Results</h3>
          </div>
         
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, roll no, or exam..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-80 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl transition-colors duration-300">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Student Details</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Exam</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Marks</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Percentage</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Grade</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResults.map(result => (
                <tr key={result.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{result.studentName}</div>
                        <div className="text-xs text-gray-500">{result.rollNo} | {result.class}-{result.section}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{result.examName}</div>
                    <div className="text-xs text-gray-500">{result.generatedAt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{result.totalMarks}/{result.totalMaxMarks}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-bold text-gray-900">{result.percentage}%</div>
                      <div className={`h-2 w-16 rounded-full ${
                        result.percentage >= 90 ? 'bg-green-200' :
                        result.percentage >= 80 ? 'bg-blue-200' :
                        result.percentage >= 70 ? 'bg-yellow-200' :
                        result.percentage >= 60 ? 'bg-orange-200' :
                        'bg-red-200'
                      }`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            result.percentage >= 90 ? 'bg-green-500' :
                            result.percentage >= 80 ? 'bg-blue-500' :
                            result.percentage >= 70 ? 'bg-yellow-500' :
                            result.percentage >= 60 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                      result.grade === 'A+' ? 'bg-green-100 text-green-800 border border-green-200' :
                      result.grade === 'A' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      result.grade.startsWith('B') ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      result.grade.startsWith('C') ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                      'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                      result.status === 'Pass'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {result.status === 'Pass' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedResult(result);
                        setShowResultModal(true);
                      }}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-300 hover:scale-110"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ResultModal = () => (
    showResultModal && selectedResult && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Award className="h-7 w-7 mr-3" />
                Detailed Result Report
              </h2>
              <button
                onClick={() => setShowResultModal(false)}
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
         
          <div className="p-8">
            {/* Student Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl mb-8 border border-blue-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-blue-600 font-medium">Student Name</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedResult.studentName}</p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 p-3 rounded-full w-fit mx-auto mb-2">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-emerald-600 font-medium">Roll Number</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedResult.rollNo}</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600 p-3 rounded-full w-fit mx-auto mb-2">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-purple-600 font-medium">Class</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedResult.class}-{selectedResult.section}</p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-600 p-3 rounded-full w-fit mx-auto mb-2">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-amber-600 font-medium">Exam</p>
                  <p className="font-bold text-gray-900 text-lg">{selectedResult.examName}</p>
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                Subject-wise Performance
              </h3>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Marks Obtained</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total Marks</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Percentage</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedResult.subjects.map((subject, index) => (
                      <tr key={index} className="hover:bg-blue-50/30 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{subject.subjectName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-gray-900">{subject.marks}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-gray-600">{subject.maxMarks}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-gray-900">{subject.percentage}%</span>
                            <div className={`h-2 w-20 rounded-full ${
                              subject.percentage >= 90 ? 'bg-green-200' :
                              subject.percentage >= 80 ? 'bg-blue-200' :
                              subject.percentage >= 70 ? 'bg-yellow-200' :
                              subject.percentage >= 60 ? 'bg-orange-200' :
                              'bg-red-200'
                            }`}>
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  subject.percentage >= 90 ? 'bg-green-500' :
                                  subject.percentage >= 80 ? 'bg-blue-500' :
                                  subject.percentage >= 70 ? 'bg-yellow-500' :
                                  subject.percentage >= 60 ? 'bg-orange-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${subject.percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                            subject.grade === 'A+' ? 'bg-green-100 text-green-800 border border-green-200' :
                            subject.grade === 'A' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            subject.grade.startsWith('B') ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            subject.grade.startsWith('C') ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                            'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {subject.percentage >= 90 ? (
                              <span className="text-green-600 font-semibold flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                Excellent
                              </span>
                            ) : subject.percentage >= 80 ? (
                              <span className="text-blue-600 font-semibold flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                Very Good
                              </span>
                            ) : subject.percentage >= 70 ? (
                              <span className="text-yellow-600 font-semibold">Good</span>
                            ) : subject.percentage >= 60 ? (
                              <span className="text-orange-600 font-semibold">Average</span>
                            ) : (
                              <span className="text-red-600 font-semibold">Needs Improvement</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Overall Summary */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3" />
                Overall Performance Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                  <p className="text-blue-100 text-sm font-medium mb-2">Total Marks</p>
                  <p className="text-3xl font-bold">{selectedResult.totalMarks}</p>
                  <p className="text-blue-200 text-sm">out of {selectedResult.totalMaxMarks}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                  <p className="text-blue-100 text-sm font-medium mb-2">Percentage</p>
                  <p className="text-3xl font-bold">{selectedResult.percentage}%</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${selectedResult.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                  <p className="text-blue-100 text-sm font-medium mb-2">Overall Grade</p>
                  <p className="text-3xl font-bold">{selectedResult.grade}</p>
                  <p className="text-blue-200 text-sm">{selectedResult.points} points</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
                  <p className="text-blue-100 text-sm font-medium mb-2">Result Status</p>
                  <p className={`text-3xl font-bold ${selectedResult.status === 'Pass' ? 'text-green-300' : 'text-red-300'}`}>
                    {selectedResult.status}
                  </p>
                  <div className="flex justify-center mt-2">
                    {selectedResult.status === 'Pass' ? (
                      <CheckCircle className="h-5 w-5 text-green-300" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setShowResultModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <Eye className="h-5 w-5" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Result Management</h1>
                <p className="text-gray-600">Comprehensive exam result tracking system</p>
              </div>
            </div>
           
            {/* Navigation Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('marks')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'marks'
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                Add Marks
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'results'
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'marks' && <MarksEntry />}
        {activeTab === 'results' && <ResultsList />}
      </div>

      {/* Modal and Notification */}
      <ResultModal />
      <Notification />
    </div>
  );
};

export default ManageExamResult;                