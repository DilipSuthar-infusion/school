import React, { useState } from 'react';
import { FiEdit2, FiMail, FiMoreVertical, FiPhoneCall, FiSearch } from 'react-icons/fi';
import useUserApi from '../../hooks/useUserApi';
import { ClipLoader } from 'react-spinners'; // If you use loading spinner

const ManageParents = () => {
  const { users, loading, error, handleAddUser, handleDelete, credentials} = useUserApi();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    relationType: '',
    studentId: '',
    occupation: '',

  });

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));
    setProfile(file);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ParentData = new FormData();
    ParentData.append('profilePicture', profile);
    ParentData.append('name', formData.name);
    ParentData.append('email', formData.email);
    ParentData.append('phone', formData.phone);
    ParentData.append('address', formData.address);
    ParentData.append('occupation', formData.occupation);
    ParentData.append('relationType', formData.relationType);
    ParentData.append('studentId', formData.studentId);
    ParentData.append('role', 'parent');

    try {
      const res = await handleAddUser(ParentData); 
      setAvatar(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        relationType: '',
        studentId: '',
        occupation: '',
      });
      setOpen(false);
    } catch {
      console.log('Error adding parent');
    }
  };

  return (
    <>
      <div className="p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent w-full"
            />
          </div>
          <div className="flex gap-4 items-center">
            <select className="border px-4 py-2 rounded text-sm">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
              onClick={() => setOpen(true)}
            >
              + Add Parent
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-orange-400 text-left text-gray-100">
              <tr>
                <th className="p-3">Parent's Photo</th>
                <th className="p-3">Parent Name</th>
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
                  <td colSpan="10" className="text-center py-4">
                    <ClipLoader color="#36d7b7" loading={loading} size={30} />
                  </td>
                </tr>
              ) : (
                users
                  ?.filter(user => user.role === 'parent')
                  .map((parent, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-2 w-20">
                        <img
                          src={`http://localhost:2000/${parent.profilePicture}`}
                          alt="avatar"
                          className="w-20 rounded-md"
                        />
                      </td>
                      <td className="p-3 font-medium">{parent.name}</td>
                      <td className="p-3 text-purple-700 font-semibold">
                      {users.find(parentData => parentData.id === parent.studentId).name}
                      </td>
                      <td className="p-3">{parent.email || 'N/A'}</td>
                      <td className="p-3 text-gray-700 truncate max-w-xs">
                        {parent.phone}
                      </td>
                     <td className='p-3'>
                        {parent.address}
                      </td>
                      <td className="p-3">{parent.occupation || 'N/A'}</td>
                      <td className="p-3">{parent.relationType || 'N/A'}</td>
                      <td className="p-3 relative">
            <FiMoreVertical
              className="cursor-pointer"
              onClick={() =>
                setOpenDropdown(openDropdown === parent.id ? null : parent.id)
              }
            />

            {openDropdown === parent.id && (
              <div className="absolute right-12 mt-2 w-42 bg-white border rounded shadow z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleAddParent(parent.id)}
                >
                  Add Parent Details
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setOpen(true);
                    setFormData({
                      name: parent.name,
                      email: parent.email,
                      phone: parent.phone,
                      gender: parent.gender,
                      dateOfBirth: parent.dateOfBirth,
                      bloodGroup: parent.bloodGroup,
                      classId: parent.classId,
                      address: parent.address,
                    });
                    setOpenDropdown(null);
                  }}
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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-700">Add Parent Details</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div className="text-center w-20 relative">
                <img
                  src={
                    avatar ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
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
              <div>
                <label className="block text-sm font-medium mb-1">Parent Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Student Name</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  onChange={handleChange}
                  name="studentId"
                  required
                >
                  {loading && <option value="">Loading...</option>}
                  <option value="">Select Student</option>
                  {users?.filter(user => user.role === 'student').map((student) => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile No.</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  name="address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Occupation</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  name="occupation"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relation Type</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  name="relationType"
                  onChange={handleChange}
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
      )}
    </>
  );
};

export default ManageParents;
