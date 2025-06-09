import { BookCopy, Calendar, Camera, Mail, MapPin, Pen, Phone, User, Users, X } from 'lucide-react';
import React from 'react'
import { FiEdit2, FiMail, FiMoreVertical, FiPhoneCall, FiSearch } from 'react-icons/fi';
const ManageEvents = () => {
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [error, setError] = React.useState({});
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        classId: "",
        address: "",
        profilePicture: null,
    });
    const [avatar, setAvatar] = React.useState(null);

    const closeStudentModal = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
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
          <div className="flex gap-4 items-center">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200"
              onClick={() => setOpen(true)}
            >
              + Add Event
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100 text-left text-blue-600">
              <tr>
                <th className='p-3'>Sr. No.</th>
                <th className="p-3">Event Title</th>
                <th className="p-3">Event Description</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            {/* <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    <ClipLoader color="#36d7b7" loading={loading} size={30} />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-12 text-gray-500">
                    No parents found.
                  </td>
                </tr> ) : (
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
            </tbody> */}

          </table>
        </div>
      </div>




      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            aria-hidden="true"
            onClick={closeStudentModal}
          ></div>
  
          <div className="relative w-full max-w-md sm:max-w-7xl transform rounded-3xl bg-white shadow-2xl transition-all z-10">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2" id="modal-title">
                <Calendar className="w-6 h-6"/>
                  {edit ? "Edit Student" : "Add New Event"}
                </h3>
                <button
                  onClick={closeStudentModal}
                  className="text-white hover:text-red-200 transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
  
           
            <form onSubmit={handleSubmit} className="px-6 py-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Pen className="w-4 h-4 text-blue-600 float-left me-1" />
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        placeholder="Sports Day"
                      />
                      {error?.nameErr && (
                        <p className="text-red-500 text-xs mt-1" id="name-error">
                          {error.nameErr}
                        </p>
                      )}
                    </div>
  
              
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <BookCopy className="w-4 h-4 text-blue-600 float-left me-1" />
                        Description
                      </label>
                      <input
                        type="email"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                        placeholder="Sports Day in the park"
                      />
                      {error?.emailErr && (
                        <p className="text-red-500 text-xs mt-1" id="email-error">
                          {error.emailErr}
                        </p>
                      )}
                    </div>
                  </div>
  
          
  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Calendar className="w-4 h-4 text-blue-600 float-left me-1" />
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        placeholder='2022-05-01'
                        onChange={handleChange}
                        value={formData.startDate}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      />
                      {error?.dobErr && (
                        <p className="text-red-500 text-xs mt-1" id="dob-error">
                          {error.dobErr}
                        </p>
                      )}
                    </div>
  
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-600 float-left me-1" />
                        Ending Date
                      </label>
                      <input
                        type="date"
                        name="endingDate"
                        onChange={handleChange}
                        value={formData.endingDate}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                      />
                      {error?.bloodGroupErr && (
                        <p className="text-red-500 text-xs mt-1" id="bloodGroup-error">
                          {error.bloodGroupErr}
                        </p>
                      )}
                    </div>
                  </div>
  
            
  
  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="w-4 h-4 text-blue-600 float-left me-1" />
                      Location
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      onChange={handleChange}
                      value={formData.address}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white resize-none"
                      placeholder="123 Main St, City, Country"
                    />
                    {error?.addressErr && (
                      <p className="text-red-500 text-xs mt-1" id="address-error">
                        {error.addressErr}
                      </p>
                    )}
                  </div>
                </div>
  
                  <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeStudentModal}
                      className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                    >
                      {edit ? "Update Student" : "Create Event"}
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
      </>
  )
}

export default ManageEvents