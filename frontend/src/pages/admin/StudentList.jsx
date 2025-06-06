import React, { useEffect, useMemo, useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMoreVertical,
  FiSearch,
  FiEdit2,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUserApi from "../../hooks/useUserApi";
import ClipLoader from "react-spinners/ClipLoader";
import useClassApi from "../../hooks/useClassApi";
import { FaTimes } from "react-icons/fa";

const StudentList = () => {
  const { Classes } = useClassApi();
  const { users, loading, error, handleDelete, handleAddUser, credentials } =
    useUserApi();
  const [avatar, setAvatar] = useState(null);
  const [parentAvatar, setParentAvatar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [parentProfile, setParentProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [studentInfo, setStudentInfo] = useState(false);
  const [parentModel, setParentModel] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    classId: "",
    address: "",
  });
  const [parentFromData, setParentFromData] = useState({
    name: "",
    studentId: "",
    phone: "",
    address: "",
    occupation: "",
    relationType: "",
  });

  const handleParentChange = (e) => {
    setParentFromData({ ...parentFromData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));
    setProfile(file);
  };

  const handleParentFileChange = (e) => {
    const file = e.target.files[0];
    setParentAvatar(URL.createObjectURL(file));
    setParentProfile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("profilePicture", profile);
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("gender", formData.gender);
    submitData.append("dateOfBirth", formData.dateOfBirth);
    submitData.append("bloodGroup", formData.bloodGroup);
    submitData.append("classId", formData.classId);
    submitData.append("address", formData.address);
    submitData.append("role", "student");

    try {
      await handleAddUser(submitData);
      setAvatar(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        classId: "",
        address: "",
      });
      setOpen(false);
      setProfile(null);
      setStudentInfo(true);
    } catch (error) {
      console.error(
        "Error creating student:",
        error.response?.data || error.message
      );
    }
  };
  const handleParentSubmit = async (e) => {
    e.preventDefault();
    const ParentData = new FormData();
    ParentData.append("profilePicture", parentProfile);
    ParentData.append("name", parentFromData.name);
    ParentData.append("email", parentFromData.email);
    ParentData.append("phone", parentFromData.phone);
    ParentData.append("address", parentFromData.address);
    ParentData.append("occupation", parentFromData.occupation);
    ParentData.append("relationType", parentFromData.relationType);
    ParentData.append("studentId", parentFromData.studentId);
    ParentData.append("role", "parent");

    try {
      const res = await handleAddUser(ParentData);
      setParentAvatar(null);
      setParentFromData({
        name: "",
        email: "",
        phone: "",
        address: "",
        relationType: "",
        studentId: "",
        occupation: "",
      });
      setParentModel(false);
      setStudentInfo(true);
      setProfile(null);
    } catch {
      console.log("Error adding parent");
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center mb-4 px-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent w-full"
            />
          </div>

          <div className="flex gap-4 items-center">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200"
              onClick={() => setOpen(true)}
            >
              + New Student
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr>
                <th className="p-3">Student's Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Student's ID</th>
                <th className="p-3">Class Name</th>
                <th className="p-3">Parent Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Date of Birth</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Address</th>
                <th className="p-3">Mobile No.</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-12">
                    <ClipLoader color="#36d7b7" loading={loading} size={50} />
                  </td>
                </tr>
              ) : (
                users
                  ?.filter((student) => student.role === "student")
                  .map((student, idx) => (
                    <tr
                      key={student.id || idx}
                      className="border-b hover:bg-gray-50 odd:bg-white even:bg-gray-100"
                    >
                      <td className="p-2 w-20">
                        <img
                          src={`http://localhost:2000/${student.profilePicture}`}
                          alt="avatar"
                          className="w-20 rounded-md"
                        />
                      </td>

                      <td className="p-3 font-medium">{student.name}</td>

                      <td className="p-3 text-orange-500 font-semibold">
                        {student.admissionNumber}
                      </td>

                      <td className="p-3">
                        {Classes.find((c) => c.id === student.classId)
                          ?.classname || "N/A"}
                      </td>

                      <td className="p-3">
                        {student.Parents && student.Parents.length > 0
                          ? student.Parents[0].name
                          : "N/A"}
                      </td>

                      <td className="p-3 text-gray-700 truncate max-w-xs">
                        {student.email}
                      </td>

                      <td className="p-3">
                        {student.dateOfBirth
                          ? new Date(student.dateOfBirth).toLocaleDateString(
                              "en-US"
                            )
                          : "N/A"}
                      </td>

                      <td className="p-3">{student.gender || "N/A"}</td>

                      <td className="p-3">{student.address || "N/A"}</td>

                      <td className="p-3">{student.phone || "N/A"}</td>

                      <td className="p-3">
                        <div className="flex gap-3">
                          <a href={`tel:${student.phone}`}>
                            <FiPhone className="hover:text-orange-500 cursor-pointer transition-colors duration-200" />
                          </a>
                          <a href={`mailto:${student.email}`}>
                            <FiMail className="hover:text-orange-500 cursor-pointer transition-colors duration-200" />
                          </a>
                        </div>
                      </td>

                      <td className="p-3 relative">
                        <FiMoreVertical
                          className="cursor-pointer"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === student.id ? null : student.id
                            )
                          }
                        />

                        {openDropdown === student.id && (
                          <div className="absolute right-12 mt-2 w-42 bg-white border rounded shadow z-10">
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => {
                                setParentModel(true);
                                setParentFromData({
                                  ...parentFromData,
                                  studentId: student.id,
                                });
                                setOpenDropdown(null);
                              }}
                            >
                              Add Parent Details
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => {
                                setOpen(true);
                                setFormData({
                                  name: student.name,
                                  email: student.email,
                                  phone: student.phone,
                                  gender: student.gender,
                                  dateOfBirth: student.dateOfBirth,
                                  bloodGroup: student.bloodGroup,
                                  classId: student.classId,
                                  address: student.address,
                                });
                                setOpenDropdown(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                              onClick={() => {
                                handleDelete(student.id);
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

      {studentInfo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8  w-[500px] text-center">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              Student Created Successfully
            </h2>
            <p className="text-xl mb-2">
              <strong>Email:</strong> {credentials.email}
            </p>
            <p className="text-xl mb-4">
              <strong>Password:</strong> {credentials.password}
            </p>
            <button
              onClick={() => setStudentInfo(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-50">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4 relative">
                  <h3 className="text-lg font-semibold !text-orange-600 text-center w-full">
                    Add New Student
                  </h3>
                  <span
                    onClick={() => setOpen(false)}
                    className="absolute right-0 text-black-100 cursor-pointer"
                  >
                    <FaTimes className="text-xl" />
                  </span>
                </div>
                <form
                  className="space-y-3"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="relative w-28 h-28 mx-auto border-2 border-blue-500  rounded-full">
                    <img
                      src={
                        avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                    />
                    <label
                      htmlFor="avatarInput"
                      className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer"
                    >
                      <FiEdit2 className="text-gray-700" />
                    </label>
                    <input
                      type="file"
                      id="avatarInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Student Name"
                      onChange={handleChange}
                      value={formData.name}
                      required
                      className="w-full py-2 ps-2 focus:ring-1 focus:ring-blue-500 outline-none rounded-lg border-1 border-gray-300 transition-colors duration-200"
                    />
                  </div>

                  <div className="mt-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={formData.email}
                      className="w-full py-2 ps-2 focus:ring-1 focus:ring-blue-500 outline-none rounded-lg border-1 border-gray-300 transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="flex gap-3 mt-3">
                    {/* Phone Input */}
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={formData.phone}
                      className="w-1/2 py-2 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                      required
                    />

                    {/* Gender Select */}
                    <div className="relative w-1/2">
                      <select
                        name="gender"
                        onChange={handleChange}
                        value={formData.gender}
                        className="block w-full appearance-none bg-blue-50 py-2 px-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition duration-200"
                        required
                      >
                        <option value="" className="text-gray-400">
                          Select Gender
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>

                      {/* Dropdown Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <DatePicker
                      selected={formData.dateOfBirth}
                      onChange={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          dateOfBirth: date,
                        }))
                      }
                      className="w-full p-2 rounded border border-gray-300 bg-blue-50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition duration-200"
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                    />

                    <input
                      type="text"
                      name="bloodGroup"
                      placeholder="Blood Group"
                      onChange={handleChange}
                      value={formData.bloodGroup}
                      className="w-full py-2 ps-2 focus:ring-1 focus:ring-blue-500 outline-none rounded-lg border-1 border-gray-300 transition-colors duration-200"
                    />
                  </div>
                  <div className="mt-3 relative">
                    <select
                      name="classId"
                      onChange={handleChange}
                      value={formData.classId}
                      className="block w-full appearance-none py-2 ps-2 pr-10 rounded-lg bg-white border border-gray-300 text-gray-500 focus:ring-1 focus:ring-blue-500 outline-none focus:border-blue-500 transition duration-200"
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select Class
                      </option>
                      {Classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.classname}
                        </option>
                      ))}
                    </select>

                    {/* Custom dropdown icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-3 mb-3">
                    <textarea
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full py-2 ps-2 focus:ring-1 focus:ring-blue-500 outline-none rounded-lg border-1 border-gray-300 transition-colors duration-200"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                  >
                    Create Student
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {parentModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-purple-700">
                  Add Parent Details
                </h2>
                <button
                  onClick={() => setParentModel(false)}
                  className="text-gray-500 hover:text-red-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <form
                className="grid grid-cols-2 gap-4"
                onSubmit={handleParentSubmit}
              >
                <div className="text-center w-20 relative">
                  <img
                    src={
                      parentAvatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                  />
                  <label
                    htmlFor="avatarInput"
                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer"
                  >
                    <FiEdit2 className="text-gray-700" />
                  </label>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    onChange={handleParentFileChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Parent Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="name"
                    onChange={handleParentChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Student Name
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    onChange={handleParentChange}
                    name="studentId"
                    value={parentFromData.studentId}
                    required
                  >
                    {loading && <option value="">Loading...</option>}
                    <option value="">Select Student</option>
                    {users
                      ?.filter((user) => user.role === "student")
                      .map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    name="email"
                    onChange={handleParentChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="phone"
                    onChange={handleParentChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="address"
                    onChange={handleParentChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="occupation"
                    onChange={handleParentChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Relation Type
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    name="relationType"
                    onChange={handleParentChange}
                    required
                  >
                    <option value="">Select Relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;
