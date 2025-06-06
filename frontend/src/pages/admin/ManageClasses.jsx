import React, { useEffect, useState } from 'react';
import { FiEdit2, FiSearch } from 'react-icons/fi';
import useClassApi from '../../hooks/useClassApi';

const ManageClasses = () => {
  const { handleAddClass, Classes } = useClassApi();
  const [classesModel, setClassesModel] = useState(false);

  const [formData, setFormData] = useState({
    classname: '',
    section: '',
    roomNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddClass(formData); 
      setFormData({ classname: '', section: '', roomNumber: '' });
      setClassesModel(false);
      
    } catch (error) {
      console.error('Error creating class:', error.response?.data || error.message);
    }
  };



  return (
    <>
      <div className="p-4">
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
              onClick={() => setClassesModel(true)}
            >
              + New Class
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-orange-400 text-left text-gray-100">
              <tr>
                <th className="p-3">Class Name</th>
                <th className="p-3">Section</th>
                <th className="p-3">Room Number</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {Classes.map(cls => (
                <tr key={cls.id} className="border-b">
                  <td className="p-3">{cls.classname}</td>
                  <td className="p-3">{cls.section}</td>
                  <td className="p-3">{cls.roomNumber}</td>
                  <td className="p-3">
                    <FiEdit2 className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for new class */}
      {classesModel && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Class</h2>
            <p className="text-sm mb-2 cursor-pointer" onClick={() => setClassesModel(false)}>x</p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Class Name</label>
                <input
                  type="text"
                  name="classname"
                  placeholder="Ex. Class 1"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </div>
              <div>
                <label htmlFor="section" className="block text-sm font-medium mb-1">Section</label>
                <input
                  type="text"
                  name="section"
                  placeholder="Ex. A, B, C"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.section}
                  required
                />
              </div>
              <div>
                <label htmlFor="roomNumber" className="block text-sm font-medium mb-1">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Ex. 101"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.roomNumber}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
              >
                Create Class
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageClasses;
