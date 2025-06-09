import React from 'react'
import { FiSearch } from 'react-icons/fi'
import useSubjectApi from '../../hooks/useSubjectApi'
 
const ManageSubjects = () => {
  const {loading} = useSubjectApi()
  const [classesModel, setClassesModel] = React.useState(false)
  const [formData, setFormData] = React.useState({
    classname: '',
    section: '',
    roomNumber: '',
  })
  const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value })
  }
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
                  {/* {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12">
                        <ClipLoader color="#36d7b7" loading={loading} size={50} />
                      </td>
                    </tr>
                  ) : (
                    Classes.map(cls => (
cls.id} className="border-b">
                        <td className="p-3">{cls.classname}</td>
                        <td className="p-3">{cls.section}</td>
                        <td className="p-3">{cls.roomNumber}</td>
                        <td className="p-3">
                          <FiEdit2 className="cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
    
          {/* Modal for new class */}
          {classesModel && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Add New Class</h2>
                  <button
                    className="text-gray-500 text-lg"
                    onClick={() => setClassesModel(false)}
                  >
                    ×
                  </button>
                </div>
                <form className="space-y-3" >
                  <div>
                    <label htmlFor="classname" className="block text-sm font-medium mb-1">Class Name</label>
                    <input
                      type="text"
                      name="classname"
                      placeholder="Ex. Class 1"
                      className="w-full border p-2 rounded"
                      onChange={handleChange}
                      value={formData.classname}
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
  )
}
 
export default ManageSubjects