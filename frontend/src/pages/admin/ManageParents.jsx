import React, { useMemo, useState } from "react";
import useUserApi from "../../hooks/useUserApi.js";
import { ClipLoader } from "react-spinners";
import ParentFormModal from "../../components/ParentFormModal.jsx";
import Swal from "sweetalert2";
import { GripVertical, Search } from "lucide-react";

const ManageParents = () => {
  const { users, loading, handleDelete, handleAddUser, handleEditUser } =
    useUserApi();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [parentModel, setParentModel] = useState(false);
  const [parentFromData, setParentFromData] = useState({
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

  const [searchTerm, setSearchTerm] = useState("");

  const [parentAvatar, setParentAvatar] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");
  const closeParentModal = () => {
    setParentModel(false);
    setParentAvatar(null);
    setParentProfile(null);
    setParentId(null);
    setIsEditMode(false);
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
    setError("");
  };

  const handleParentFormDataChange = (e) => {
    const { name, value } = e.target;
    setParentFromData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleParentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setParentAvatar(URL.createObjectURL(file));
      setParentProfile(file);
      setParentFromData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const validateParentForm = () => {
    const newErrors = {};
    if (parentFromData.username.trim().length < 3) {
      newErrors.parentNameErr = "Parentname must be at least 3 char.";
    }
    if (parentFromData.motherName.trim().length < 3) {
      newErrors.motherNameErr = "Mothername must be at least 3 char.";
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
    if (!parentId && !parentProfile) {
      newErrors.parentFileErr = "Please upload a profile picture.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitParent = async (e) => {
    e.preventDefault();

    if (!validateParentForm()) {
      Swal.fire({
        icon: "error",
        text: "Please fill in all required fields.",
        confirmButtonText: "OK",
      });
      return;
    }

    const ParentData = new FormData();
    if (parentProfile) {
      ParentData.append("profilePicture", parentProfile);
    }

    ParentData.append("username", parentFromData.username);
    ParentData.append("motherName", parentFromData.motherName);
    ParentData.append("email", parentFromData.email);
    ParentData.append("phone", parentFromData.phone);
    ParentData.append("address", parentFromData.address);
    ParentData.append("occupation", parentFromData.occupation);
    ParentData.append("relationType", parentFromData.relationType);
    ParentData.append("studentId", parentFromData.studentId);
    ParentData.append("role", "parent");

    try {
      if (isEditMode && parentId) {
        await handleEditUser(parentId, ParentData);
      } else {
        await handleAddUser(ParentData);
      }
      closeParentModal();
    } catch (error) {
      console.error("Error submitting parent:", error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditParent = (parent) => {
    setIsEditMode(true);
    setParentId(parent.id);
    setParentModel(true);

    if (parent.profilePicture) {
      setParentAvatar(`http://localhost:2000/${parent.profilePicture}`);
    }

    setParentFromData({
      username: parent.username || "",
      motherName: parent.motherName || "",
      email: parent.email || "",
      studentId:
        parent.Students && parent.Students.length > 0
          ? parent.Students[0].id
          : "",
      phone: parent.phone || "",
      address: parent.address || "",
      occupation: parent.occupation || "",
      relationType: parent.relationType || "",
      profilePicture: parent.profilePicture || null,
    });

    setOpenDropdown(null);
  };
  const filteredParents = useMemo(() => {
    let filtered = users.filter((user) => user.role === "parent");
    if (searchTerm) {
      filtered = filtered.filter((parent) =>
        parent.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm, users]);

  return (
    <>
      <div className="p-2">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-4 md:px-4 md:py-4 py-2 px-2 bg-white rounded-lg shadow-md">
    <div className="flex items-center gap-2 border-1 border-gray-200 bg-gray-100 rounded px-3 py-2 md:w-1/3 w-full">
      <Search className="text-gray-500" />
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
        setIsEditMode(false);
        setParentModel(true);
      }}
      className="
        bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded hover:bg-blue-600 md:w-1/5 lg:w-1/9 w-full
      "
    >
      + Add Parent
    </button>
  </div>

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr className='text-center'>
                <th className="p-3">Sr.No.</th>
                <th className="p-3">Parent's Photo</th>
                <th className="p-3">Father Name</th>
                <th className="p-3">Mother Name</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile No.</th>
                <th className="p-3">Address</th>
                <th className="p-3">Occupation</th>
                <th className="p-3">RelationType</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <ClipLoader color="#36d7b7" loading={loading} size={30} />
                  </td>
                </tr>
              ) : filteredParents.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-gray-500">
                    No parents found.
                  </td>
                </tr>
              ) : (
                filteredParents
                  ?.filter((user) => user.role === "parent")
                  .map((parent, idx) => (
                    <tr
                      key={parent.id || idx}
                      className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white text-center"
                    >
                      <td className="p-3 w-20 text-center font-semibold">
                        {idx + 1}.
                      </td>
                      <td className="p-3 w-20 text-center">
                        <img
                          src={`http://localhost:2000/${parent.profilePicture}`}
                          alt="avatar"
                          className="w-20 rounded-full"
                        />
                      </td>
                      <td className="p-3 font-medium">{parent.username}</td>
                      <td className="p-3 font-medium">{parent.motherName}</td>
                      <td className="p-3 text-orange-500 font-semibold">
                        {parent.Students && parent.Students.length > 0
                          ? parent.Students[0].username
                          : "N/A"}
                      </td>
                      <td className="p-3">{parent.email || "N/A"}</td>
                      <td className="p-3 text-gray-700 truncate max-w-xs">
                        {parent.phone}
                      </td>
                      <td className="p-3">{parent.address}</td>
                      <td className="p-3">{parent.occupation || "N/A"}</td>
                      <td className="p-3">{parent.relationType || "N/A"}</td>
                      <td className="py-3 px-6 relative">
                        <GripVertical
                          className="cursor-pointer w-5"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === parent.id ? null : parent.id
                            )
                          }
                        />

                        {openDropdown === parent.id && (
                          <div className="absolute right-5 mt-2 w-42 bg-gray-100 border-2 border-gray-200 rounded shadow-md z-10">
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => handleEditParent(parent)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                              onClick={() => {
                                handleDelete(parent.id);
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
      

      <ParentFormModal
        open={parentModel}
        closeParentModal={closeParentModal}
        parentFromData={parentFromData}
        handleParentChange={handleParentFormDataChange}
        handleParentFileChange={handleParentFileChange}
        parentAvatar={parentAvatar}
        error={error}
        handleParentSubmit={handleSubmitParent}
        students={users?.filter((user) => user.role === "student")}
        isEditMode={isEditMode}
        setError={setError}
      />
    </>
  );
};

export default ManageParents;
