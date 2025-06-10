import React, { useEffect, useState } from 'react';
import { FiEdit2, FiMoreVertical, FiSearch } from 'react-icons/fi';
import useClassApi from '../../hooks/useClassApi';
import { BookAIcon, BookCopy, DoorClosed, House, X } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageClasses = () => {
  const { handleAddClass, Classes, handleDelete, handleEditClass } = useClassApi();
  const [classesModel, setClassesModel] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    classname: '',
    section: '',
    roomNumber: '',
  });
  const [error, setError] = useState({});
  const [edit, setEdit] = useState(false);
  const [classId, setClassId] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.classname) {
      newErrors.classname = "Class name is required";
    }
    if (!formData.section) {
      newErrors.section = "Section is required";
    }
    if (!formData.roomNumber) {
      newErrors.roomNumber = "Room number is required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) {
      return;
    }
    try {
      if (classId) {
        await handleEditClass(classId, formData);
        Swal.fire({
          icon: "success",
          text: "Class updated successfully",
          confirmButtonText: "OK",
        });
      } else {
        await handleAddClass(formData); 
        Swal.fire({
          icon: "success",
          text: "Class created successfully",
          confirmButtonText: "OK",
        });
      }
      setFormData({ classname: '', section: '', roomNumber: '' });
      setClassesModel(false);
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Failed to save class. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <>
      <div className="p-4">
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200"
              onClick={() => setClassesModel(true)}
            >
              + New Class
            </button>
          </div>
        </div>

        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full table-auto text-sm border-collapse bg-white">
            <thead className="bg-blue-50 text-left text-blue-600 font-semibold">
              <tr>
                <th className='p-3'>Sr. No.</th>
                <th className="p-3">Class Name</th>
                <th className="p-3">Section</th>
                <th className="p-3">Room Number</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {Classes.map((cls, index) => (
                <tr key={cls.id} className="border-b">
                  <td className='p-3'>{index + 1}</td>
                  <td className="p-3">{cls.classname}</td>
                  <td className="p-3">{cls.section}</td>
                  <td className="p-3">{cls.roomNumber}</td>
                  <td className="p-3 relative">
                    <FiMoreVertical
                      className="cursor-pointer"
                      aria-label="More actions"
                      onClick={() =>
                        setOpenDropdown(openDropdown === cls.id ? null : cls.id)
                      }
                    />
                    {openDropdown === cls.id && (
                      <div className="absolute right-55 top-5 mt-2 w-40 bg-white border rounded shadow z-10">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            setClassesModel(true);
                            setEdit(true);
                            setClassId(cls.id);
                            setFormData({
                              classname: cls.classname,
                              section: cls.section,
                              roomNumber: cls.roomNumber,
                            });
                            setOpenDropdown(null);
                          }}
                        >
                          Edit Class
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            handleDelete(cls.id);
                            setOpenDropdown(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {classesModel && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-55">
          <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full">
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl flex justify-between items-center'>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2"><BookCopy className="w-6 h-6" />{edit ? "Edit Class" : "Add New Class"}</h3>
              <button
                onClick={() => setClassesModel(false)}
                className="text-white hover:text-red-200 transition-colors p-1"
                aria-label="Close modal"
              ><X className="w-6 h-6" /></button>
            </div>
            <div className='px-6 py-6'>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className='mt-4'>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700"><BookAIcon className='w-4 h-4 text-blue-600 float-left me-1' />Class Name</label>
                  <input
                    type="text"
                    name="classname"
                    placeholder="Ex. Class 1"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    value={formData.classname}
                  />
                  {error?.classname && (
                    <p className="text-red-500 text-xs mt-1" id="name-error">
                      {error.classname}
                    </p>
                  )}
                </div>
                <div className='mt-4'>
                  <label htmlFor="section" className="flex items-center gap-2 text-sm font-semibold text-gray-700"><DoorClosed className='w-4 h-4 text-blue-600 float-left me-1' />Section</label>
                  <input
                    type="text"
                    name="section"
                    placeholder="Ex. A, B, C"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    value={formData.section}
                  />
                  {error?.section && (
                    <p className="text-red-500 text-xs mt-1" id="section-error">
                      {error.section}
                    </p>
                  )}
                </div>
                <div className='mt-4'>
                  <label htmlFor="roomNumber" className="flex items-center gap-2 text-sm font-semibold text-gray-700"><House className='w-4 h-4 text-blue-600 float-left me-1' />Room Number</label>
                  <input
                    type="text"
                    name="roomNumber"
                    placeholder="Ex. 101"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    value={formData.roomNumber}
                  />
                  {error?.roomNumber && (
                    <p className="text-red-500 text-xs mt-1" id="roomNumber-error">
                      {error.roomNumber}
                    </p>
                  )}
                </div>
                <div className='flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200'>
                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                  >
                    {edit ? "Update Class" : "Create Class"}
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

export default ManageClasses;
