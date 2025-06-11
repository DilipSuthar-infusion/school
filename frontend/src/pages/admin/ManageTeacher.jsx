import React, { useMemo, useState } from 'react'
import { FiMoreVertical, FiSearch } from 'react-icons/fi';
import TeacherFormModal from '../../components/TeacherFromModal';
import useUserApi from '../../hooks/useUserApi';
import useSubjectApi from '../../hooks/useSubjectApi';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
const ManageTeacher = () => {
    const { users, loading, handleAddTeacher ,handleEditUser, handleDelete} = useUserApi();
    const [teacherModel, setTeacherModel] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);
    const closeTeacherModal = () => {
        setTeacherModel(false);
    }
    const { subjects } = useSubjectApi();
    const [teacherData, setTeacherData] = useState({
        username: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        qualification: "",
        subjectsTaught: [],
        joiningDate: "",
        salary: "",
        profilePicture: null,
    });
    const [teacherId, setTeacherId] = useState(null);
    const [teacherAvatar, setTeacherAvatar] = useState(null);
    const [teacherProfile, setTeacherProfile] = useState(null);
    const [error, setError] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);


    const handleTeacherDataChange = (e) => {
      const { name, value } = e.target;
      setTeacherData((prevData) => ({ ...prevData, [name]: value }));
  };




  const handleTeacherFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setTeacherAvatar(URL.createObjectURL(file));
          setTeacherProfile(file);
          setTeacherData((prev) => ({ ...prev, profilePicture: file }));
      }
  };






  const handleTeacherSelectedDataChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
  
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
  
    setTeacherData({
      ...teacherData,
      subjectsTaught: selectedValues
    });
  };






    const validateTeacherForm = () => {
        const newErrors = {};
        if (teacherData.username.trim().length < 3) {
            newErrors.teacherNameErr = "Teacher name must be at least 3 characters.";
        }
        if (teacherData.qualification.trim().length < 3) {
            newErrors.qualificationErr = "Qualification must be at least 3 characters.";
        }
        if (!teacherData.subjectsTaught) {
            newErrors.subjectsTaughtErr = "SubjectsTaught must be selected.";
        }
        if (teacherData.joiningDate.trim().length < 3) {
            newErrors.joiningDateErr = "JoiningDate must be at least 3 characters.";
        }
        if (!teacherData.salary) {
            newErrors.salaryErr = "Salary must be at least 3 characters.";
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(teacherData.email)) {
            newErrors.teacherEmailErr = "Please enter a valid email.";
        }
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(teacherData.phone)) {
            newErrors.teacherPhoneErr = "Please enter a valid phone number.";
        }
        if (!teacherData.profilePicture) {
            newErrors.teacherFileErr = "Please upload a profile picture.";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    const handleEditteacher = (teacher) => {
        setIsEditMode(true);
        setTeacherId(teacher.id);
        setTeacherModel(true);
        

        if (teacher.profilePicture) {
            setTeacherAvatar(`http://localhost:2000/${teacher.profilePicture}`);
        }
        
        setTeacherData({
            username: teacher.username || "",
            email: teacher.email || "",
            phone: teacher.phone || "",
            qualification: teacher.qualification || "",
            subjectsTaught: teacher.subjectsTaught.split(",") || [],
            joiningDate: teacher.joiningDate || "",
            salary: teacher.salary || "",
            address: teacher.address || "",
            profilePicture: teacher.profilePicture || null,
        });
        
        setOpenDropdown(null);
    };




    const handleSubmitTeacher = async (e) => {
      e.preventDefault();
  
      if (!validateTeacherForm()) {
          Swal.fire({
              icon: "error",
              text: "Please fill in all required fields.",
              confirmButtonText: "OK",
          });
          return;
      }
  
      try {
          const formData = new FormData();
          formData.append("profilePicture", teacherProfile);
          formData.append("username", teacherData.username);
          formData.append("email", teacherData.email);
          formData.append("phone", teacherData.phone);
          formData.append("address", teacherData.address);
          formData.append("qualification", teacherData.qualification);
          formData.append("subjectsTaught", teacherData.subjectsTaught.join(","));
          formData.append("joiningDate", teacherData.joiningDate);
          formData.append("salary", teacherData.salary);
          formData.append("role", "teacher");
          console.log(teacherId, formData)
          if (teacherId && isEditMode) {
              await handleEditUser(teacherId, formData);
          } else {
              await handleAddTeacher(formData);
              setTeacherModel(false);
          }
  
          // Reset form after successful submit
          setTeacherAvatar(null);
          setTeacherProfile(null);
          setTeacherData({
              username: "",
              email: "",
              phone: "",
              gender: "",
              qualification: "",
              subjectsTaught: [], 
              joiningDate: "",
              salary: "",
              address: "",
              profilePicture: null,
          });
  
          closeTeacherModal();
      } catch (err) {
          console.error("Submission failed:", err);
          Swal.fire({
              icon: "error",
              text: "Something went wrong. Please try again.",
              confirmButtonText: "OK",
          });
      }
  };
  
  
  
  


    const FilteredTeacherData = useMemo(() => {
        let filtered = users;
        if (searchTerm) {
            filtered = filtered.filter(teacher =>
                teacher.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [searchTerm, users]);
  return (
    <>
      <div className="p-2">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 px-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search Parent Name..."
              className="outline-none bg-transparent w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              
            />
          </div>
          <button
            onClick={() => {
              setTeacherModel(true);
              setIsEditMode(false);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Teacher
          </button>
        </div>


        <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr>
                <th className="p-3">Sr. No.</th>
                <th className="p-3">Teacher's Photo</th>
                <th className="p-3">Teacher's Name</th>
                <th className="p-3">Qualification</th>
                <th className="p-3">SubjectsTaught</th>
                <th className="p-3">Joining Date</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile No.</th>
                <th className="p-3">Address</th>
                <th className='p-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <ClipLoader color="#36d7b7" loading={loading} size={30} />
                  </td>
                </tr>
              ) : FilteredTeacherData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-gray-500">
                    No parents found.
                  </td>
                </tr>
              ) : (
                FilteredTeacherData
                  ?.filter(user => user.role === 'teacher')
                  .map((teacher, idx) => (
                    <tr key={teacher.id || idx} className="border-b hover:bg-gray-50">
                      <td className='p-2'>{idx + 1}</td>
                      <td className="p-2 w-20">
                        <img
                          src={`http://localhost:2000/${teacher.profilePicture}`}
                          alt="avatar"
                          className="w-16 h-16 rounded-md"
                         
                          
                        />
                      </td>
                      <td className="p-3 font-medium">{teacher.username}</td>
                      <td className="p-3 font-medium">{teacher.qualification}</td>
                      <td className="p-3 font-medium">
                        {teacher.subjectsTaught && teacher.subjectsTaught.length > 0 ? teacher.subjectsTaught : 'N/A'}
                      </td>
                      <td className="p-3">{teacher.joiningDate || 'N/A'}</td>
                      <td className="p-3 text-gray-700 truncate max-w-xs">
                      ₹{teacher.salary}
                      </td>
                      <td className='p-3'>
                        {teacher.email}
                      </td>
                      <td className="p-3">{teacher.phone || 'N/A'}</td>
                      <td className="p-3">{teacher.address || 'N/A'}</td>
                      <td className="p-3 relative">
                        <FiMoreVertical
                          className="cursor-pointer"
                          onClick={() =>
                            setOpenDropdown(openDropdown === teacher.id ? null : teacher.id)
                          }
                        />

                        {openDropdown === teacher.id && (
                          <div className="absolute right-12 mt-2 w-42 bg-white border rounded shadow z-10">
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => handleEditteacher(teacher)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                              onClick={() => {
                                handleDelete(teacher.id);
                                setOpenDropdown(null);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TeacherFormModal
      open={teacherModel}
      isEditMode={isEditMode}
      handleTeacherSelectedDataChange={handleTeacherSelectedDataChange}
      subjects={subjects}
      closeTeacherModal={closeTeacherModal}
      teacherData={teacherData}
      handleTeacherDataChange={handleTeacherDataChange}
      handleTeacherFileChange={handleTeacherFileChange}
      teacherAvatar={teacherAvatar}
      handleSubmit={handleSubmitTeacher}
      />
    </>
  )
}

export default ManageTeacher