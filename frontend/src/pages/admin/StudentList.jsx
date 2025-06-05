import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { FiPhone, FiMail, FiMoreVertical, FiSearch, FiEdit2 } from 'react-icons/fi';
import useUserApi from '../../hooks/useUserApi';  
import ClipLoader from 'react-spinners/ClipLoader';


const StudentList = () => {
    const { users, loading, error, handleDelete, handleAddUser, credentials } = useUserApi();
    const [avatar, setAvatar] = useState(null);
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [classes, setClasses] = useState([]);
    const [ studentInfo, setStudentInfo] = useState(false);

    
   
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        bloodGroup: '',
        classId: '',
        address:''
      });
      
     

      

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
      };
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(URL.createObjectURL(file));
        setProfile(file);
      };
     

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const submitData = new FormData();
        submitData.append('profilePicture', profile);
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('gender', formData.gender);
        submitData.append('dateOfBirth', formData.dateOfBirth);
        submitData.append('bloodGroup', formData.bloodGroup);
        submitData.append('classId', formData.classId);
        submitData.append('address', formData.address);
        submitData.append('role', 'student');
      
        try {
          await handleAddUser(submitData);
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
          
          setProfile(null);
        } catch (error) {
          console.error('Error creating student:', error.response?.data || error.message);
        }
      };
      

    


    useEffect( () => {
        const fetchClasses = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:2000/api/classes', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setClasses(response.data);
          } catch (error) {
            console.error('Error fetching classes:', error.response?.data || error.message);
          }
        };
    
        fetchClasses();
      }, []);


    





  return (
    <>
   
    <div className="p-4" onClick={()=>openDropdown(null)}>
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
          <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition" onClick={() => setOpen(true)}>+ New Student</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-orange-400 text-left text-gray-100">
              <tr>
                  <th className="p-3">Student's Photo</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Student's ID</th>
                  <th className='p-3'>Class Name</th>
                  <th className="p-3">Parent Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Date of Birth</th>
                  <th className='p-3'>Gender</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Mobie No.</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Action</th>   
             </tr>
          </thead>
          <tbody>
  {loading ? (
    <tr>
      <td colSpan={11} className="text-center py-50">
        <ClipLoader color="#36d7b7" loading={loading} size={50} />
      </td>
    </tr>
  ) : (
    users
      ?.filter(student => student.role === 'student')
      .map((student, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
          <td className="p-2 w-20">
            <img
              src={`http://localhost:2000/${student.profilePicture}`}
              alt="avatar"
              className="w-20 rounded-md"
            />
          </td>

          <td className="p-3 font-medium">{student.name}</td>

          <td className="p-3 text-purple-700 font-semibold">
            {student.admissionNumber}
          </td>
          <td className="p-3">{classes.find(classItem => classItem.id === student.classId).name}</td>

          <td className="p-3">{student.parent || 'N/A'}</td>

          <td className="p-3 text-gray-700 truncate max-w-xs">
            {student.email}
          </td>

          <td className="p-3">
            {student.dateOfBirth
              ? new Date(student.dateOfBirth).toLocaleDateString('en-US')
              : 'N/A'}
          </td>

          <td className="p-3">{student.gender || 'N/A'}</td>

          <td className="p-3">{student.address || 'N/A'}</td>

          <td className="p-3">{student.phone || 'N/A'}</td>

          <td className="p-3 flex gap-3 text-purple-600">
            <a href={`tel:${student.phone}`}>
              <FiPhone className="hover:text-purple-800 cursor-pointer" />
            </a>
            <a href={`mailto:${student.email}`}>
              <FiMail className="hover:text-purple-800 cursor-pointer" />
            </a>
          </td>

          <td className="p-3 relative">
            <FiMoreVertical
              className="cursor-pointer"
              onClick={() =>
                setOpenDropdown(openDropdown === student.id ? null : student.id)
              }
            />

            {openDropdown === student.id && (
              <div className="absolute right-12 mt-2 w-42 bg-white border rounded shadow z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleAddParent(student.id)}
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Created Successfully</h2>
      <p className="text-sm mb-2">
        <strong>Email:</strong> {credentials.email}
      </p>
      <p className="text-sm mb-4">
        <strong>Password:</strong> {credentials.password}
      </p>
      <button
        onClick={() => {
          setStudentInfo(false);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        OK
      </button>
    </div>
  </div>
)}




   {/* Modal */}
   {open && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-50">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className='flex items-between justify-between'>
              <h3 className="text-lg text-center font-semibold mx-auto mb-4">Add New Student</h3>
              <span onClick={()=>setOpen(false)} className="text-center text-red-600 cursor-pointer">x</span>
              </div>
              
              <form className="space-y-3" onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className="relative w-28 h-28 mx-auto">
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
                <div className="flex items-center gap-2">
                <input type="text" name="name" placeholder="Student Name" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div className='flex items-center gap-2'>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div className='flex items-center gap-2'>
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2 rounded" required />
                <select name="gender" onChange={handleChange} className="w-full border p-2 rounded" required>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                </div>
                <div className='flex items-center gap-2'>
                <input type="date" name="dateOfBirth" placeholder="DOB" onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div className='flex items-center gap-2'>
                <select name="classId" onChange={handleChange} className="w-full border p-2 rounded" required>
                  <option value="">Select Class</option>
                 {classes.map((classItem) => (
                    <option value={classItem.id}>{classItem.name}</option>
                  ))}
                </select>
                </div>
                <div className='flex items-center gap-2'>
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                
                

                <button type="submit" className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Create Student</button>
              </form>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      )}



   
    </>
  );
};

export default StudentList;
