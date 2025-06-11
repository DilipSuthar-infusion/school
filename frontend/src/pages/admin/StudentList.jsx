import React, { useEffect, useState } from "react";
import { FiPhone, FiMail, FiMoreVertical, FiSearch } from "react-icons/fi";
import {
  X,
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Briefcase,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import StudentTable from "../../components/StudentTable";
import StudentFormModal from "../../components/StudentFromModal";
import ParentFormModal from "../../components/ParentFormModal";
import useUserApi from "../../hooks/useUserApi";
import useClassApi from "../../hooks/useClassApi";

const StudentList = () => {
  const { Classes } = useClassApi();
  const { users, loading,handleEditUser,  handleDelete, handleAddUser, credentials } =
    useUserApi();
  const [avatar, setAvatar] = useState(null);
  const [parentAvatar, setParentAvatar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [studentInfo, setStudentInfo] = useState(false);
  const [parentModel, setParentModel] = useState(false);
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState({});


  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    classId: "",
    address: "",
    profilePicture: null,
  });
  const [parentFromData, setParentFromData] = useState({
    username: "",
    email: "",
    motherName: "",
    studentId: "",
    phone: "",
    address: "",
    occupation: "",
    relationType: "",
    profilePicture: null,
  });

  


  const validateStudentForm = () => {
    const newErrors = {};
    if (formData.username.trim().length < 3) {
      newErrors.nameErr = "Name must be at least 3 characters.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.emailErr = "Please enter a valid email.";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      newErrors.phoneErr = "Please enter a valid phone number.";
    }
    if (!formData.gender) {
      newErrors.genderErr = "Please select gender.";
    }
    if (!formData.dateOfBirth) {
      newErrors.dobErr = "Please select date of birth.";
    }
    if (!formData.bloodGroup) {
      newErrors.bloodGroupErr = "Please select blood group.";
    }
    if (!formData.classId) {
      newErrors.classErr = "Please select class.";
    }
    if (!formData.address.trim()) {
      newErrors.addressErr = "Please enter address.";
    }
    
    if (!id && !profile) {
      
        newErrors.fileErr = "Please upload a profile picture.";

      
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateParentForm = () => {
    const newErrors = {};
    if (parentFromData.username.trim().length < 3) {
      newErrors.parentNameErr = "Parent name must be at least 3 characters.";
    }
    if (parentFromData.motherName.trim().length < 3) {
      newErrors.motherNameErr = "Mother name must be at least 3 characters.";
    } 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(parentFromData.email)) {
      newErrors.parentEmailErr = "Please enter a valid email.";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(parentFromData.phone)) {
      newErrors.parentPhoneErr = "Please enter a valid phone number.";
    }
    if (!parentFromData.address.trim()) {
      newErrors.parentAddressErr = "Please enter address.";
    }
    if (!parentFromData.occupation.trim()) {
      newErrors.parentOccupationErr = "Please enter occupation.";
    }
    if (!parentFromData.relationType) {
      newErrors.parentRelationTypeErr = "Please select relation type.";
    }
    if (!parentFromData.studentId) {
      newErrors.parentStudentIdErr = "Please select student.";
    }
    if (!parentProfile) {
      newErrors.parentFileErr = "Please upload a profile picture.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const closeStudentModal = () => {
    setOpen(false);
    setEdit(false);
    setAvatar(null);
    setProfile(null);
    setFormData({
      username: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      bloodGroup: "",
      classId: "",
      address: "",
      profilePicture: null,
    });
    setError({});
  };

  const closeParentModal = () => {
    setParentModel(false);
    setParentAvatar(null);
    setParentProfile(null);
    setParentFromData({
      username: "",
      motherName: "",
      email: "",
      studentId: "",
      phone: "",
      address: "",
      occupation: "",
      relationType: "",
      profilePicture: null,
    });
    setError({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {console.log(id)
      setAvatar(URL.createObjectURL(file));
      setProfile(file);
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleParentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setParentAvatar(URL.createObjectURL(file));
      setParentProfile(file);
      setParentFromData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleParentFormDataChange = (e) => {
    const { name, value } = e.target;
    setParentFromData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
  
    if (!validateStudentForm()) {
      Swal.fire({
        icon: "error",
        text: "Please fill in all required fields.",
        confirmButtonText: "OK",
      });
      return;
    }
  
    const submitData = new FormData();
    submitData.append("profilePicture", profile);
    submitData.append("username", formData.username);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("gender", formData.gender);
    submitData.append("dateOfBirth", formData.dateOfBirth);
    submitData.append("bloodGroup", formData.bloodGroup);
    submitData.append("classId", formData.classId);
    submitData.append("address", formData.address);
    submitData.append("role", "student");
  
    try {
      if (id) {
        await handleEditUser(id, submitData);
      } else {
        await handleAddUser(submitData);
        setStudentInfo(true);
      }
  
      setAvatar(null);
      setProfile(null);
      setFormData({
        username: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        classId: "",
        address: "",
        profilePicture: null,
      });
      setOpen(false);
    } catch (err) {
      console.error("Submission failed:", err);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };
  

  const handleSubmitParent = async (e) => {
    e.preventDefault();
    if (validateParentForm()) {
      const ParentData = new FormData();
      ParentData.append("profilePicture", parentProfile);
      ParentData.append("username", parentFromData.username);
      ParentData.append("motherName", parentFromData.motherName);
      ParentData.append("email", parentFromData.email);
      ParentData.append("phone", parentFromData.phone);
      ParentData.append("address", parentFromData.address);
      ParentData.append("occupation", parentFromData.occupation);
      ParentData.append("relationType", parentFromData.relationType);
      ParentData.append("studentId", parentFromData.studentId);
      ParentData.append("role", "parent");

      await handleAddUser (ParentData);
      closeParentModal();
      setStudentInfo(true);
    } else {
      Swal.fire({
        icon: "error",
        text: "Please fill in all required fields.",
        confirmButtonText : "OK",
        

      });
    }
  };
useEffect(() => {
    let filtered = users;

    if (selectedClass) {
      filtered = filtered.filter(student => student.classId === selectedClass);
    }

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [selectedClass, searchTerm, users]);
  

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center mb-4 px-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search Student..."
              className="outline-none bg-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 items-center">
          <select
            className="text-black px-2 py-2 rounded appearance-none bg-gray-200 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedClass}  
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSearchTerm("");
            }}
            >

              <option value="">Select Class</option>
              {Classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.classname}
                </option>
              ))}
            </select>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200"
              onClick={() => setOpen(true)}
            >
              + New Student
            </button>
          </div>
        </div>

        <StudentTable
          students={filteredStudents}
          Classes={Classes}
          loading={loading}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          setParentModel={setParentModel}
          setParentFromData={setParentFromData}
          setOpen={setOpen}
          avatar={avatar}
          edit={edit}
          setFormData={setFormData}
          setEdit={setEdit}
          profile={profile}
          setId={setId}
          setAvatar={setAvatar}
          handleDelete={handleDelete}
        />
      </div>

      {studentInfo && (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-[90%] sm:w-[500px] text-center">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Student Created Successfully
      </h2>
      <p className="text-md sm:text-lg mb-2">
        <strong>Email:</strong> <span className="text-gray-600">{credentials.email}</span>
      </p>
      <p className="text-md sm:text-lg mb-4">
        <strong>Password:</strong> <span className="text-gray-600">{credentials.password}</span>
      </p>
      <button
        onClick={() => setStudentInfo(false)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200"
      >
        OK
      </button>
    </div>
  </div>
)}


      <StudentFormModal
        open={open}
        closeStudentModal={closeStudentModal}
        formData={formData}
        handleChange={handleFormDataChange}
        handleFileChange={handleFileChange}
        avatar={avatar}
       
        error={error}
        handleSubmit={handleSubmitStudent}
        edit={edit}
        Classes={Classes}
      />

      <ParentFormModal
        open={parentModel}
        closeParentModal={closeParentModal}
        parentFromData={parentFromData}
        handleParentChange={handleParentFormDataChange}
        handleParentFileChange={handleParentFileChange}
        parentAvatar={parentAvatar}
        error={error}
        handleParentSubmit={handleSubmitParent}
        students={users}
      />
    </>
  );
};

export default StudentList;
