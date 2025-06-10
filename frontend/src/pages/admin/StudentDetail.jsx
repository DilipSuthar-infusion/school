import React, { useState, useEffect } from 'react';
import { FiUser, FiMapPin, FiPhone, FiMail, FiMoreHorizontal, FiTrendingUp } from 'react-icons/fi';
import { useParams } from 'react-router';
import useUserApi from '../../hooks/useUserApi';
import useClassApi from '../../hooks/useClassApi';
import { ClipLoader } from 'react-spinners';

const StudentDetail = () => {
  const { studentId } = useParams();
  const { fetchStudentDetails, loading, studentDetails } = useUserApi();
  const { Classes } = useClassApi();

  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (studentId) fetchStudentDetails(studentId);
  }, [studentId]);

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#36d7b7" loading={loading} size={50} />
        </div>
      ) : (
        !studentDetails ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-600 text-lg">No student data found.</div>
          </div>
        ) : (
          <div className="max-w-full mx-auto relative z-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div>
                <p className="text-xl text-gray-800 mb-4">Student Details</p>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={`http://localhost:2000/${studentDetails.profilePicture}`}
                      alt={studentDetails.username}
                      className="w-35 h-35 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">{studentDetails.username}</h1>
                    <p className="text-purple-600 font-medium text-lg"></p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {Classes.find((c) => c.id === studentDetails.classId)?.classname}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {studentDetails.dateOfBirth}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {studentDetails.gender}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiMail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email:</p>
                    <p className="font-semibold text-gray-800">{studentDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiPhone className="text-blue-600" size={20} />
                  </div>
                  <div> 
                    <p className="text-sm text-gray-500 mb-1">Phone:</p>
                    <p className="font-semibold text-gray-800">{studentDetails.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FiMapPin className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address:</p>
                    <p className="font-semibold text-gray-800">{studentDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div>
                <p className="text-xl text-gray-800 mb-4">Parent Details</p>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={`http://localhost:2000/${studentDetails?.Parents[0]?.profilePicture}`}
                      alt={studentDetails?.Parents[0]?.username}
                      className="w-35 h-35 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">{studentDetails?.Parents[0]?.username}</h1>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {studentDetails?.Parents[0]?.occupation}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {studentDetails?.Parents[0]?.relationType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother Name:</p>
                    <p className="font-semibold text-gray-800"> {studentDetails.Parents && studentDetails.Parents.length > 0
                        ? studentDetails.Parents[0].motherName
                        : "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FiMapPin className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address:</p>
                    <p className="font-semibold text-gray-800">{studentDetails?.Parents[0]?.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiPhone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone:</p>
                    <p className="font-semibold text-gray-800">{studentDetails?.Parents[0]?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiMail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email:</p>
                    <p className="font-semibold text-gray-800">{studentDetails?.Parents[0]?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StudentDetail;