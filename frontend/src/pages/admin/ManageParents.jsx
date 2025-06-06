import React, { useState } from 'react';
import { FiEdit2, FiMail, FiMoreVertical, FiPhoneCall, FiSearch } from 'react-icons/fi';
import useUserApi from '../../hooks/useUserApi.js';
import { ClipLoader } from 'react-spinners'; // If you use loading spinner

const ManageParents = () => {
  const { users, loading, error, handleDelete} = useUserApi();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [parentModel, setParentModel] = useState(false);
 



  return (
    <>
      <div className="p-2">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 px-4 py-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100 text-left text-blue-600">
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
                      <td className="p-3 text-orange-500 font-semibold">
                      {parent.Students && parent.Students.length > 0 ? parent.Students[0].name : 'N/A'}
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

    
    </>
  );
};

export default ManageParents;
