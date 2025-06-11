import axios from 'axios';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
const useUserApi = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [credentials, setCredentials] = React.useState(null);
    const [studentDetails, setStudentDetails] = React.useState(null);
   

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        const usersData = response.data;
        setUsers(usersData);
        
        
        
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    

      const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(users.filter(user => user.id !== id));
          
        } catch (error) {
          console.error('Error deleting student:', error.response?.data || error.message);
        }
      };



      const handleAddUser = async (formData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
         
        await fetchUsers(); 
          setCredentials(response.data.credentials);
          Swal.fire({
            title: `${response.data.user.role} Added`,
            text: `${response.data.message}`,
            icon: 'success',
            confirmButtonText: 'OK',
          });
      
        } catch (error) {
           
            if (error.response && error.response.data) {
              Swal.fire({
                title: 'Error',
                text: error.response?.data?.message ,
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
        }
      };

      const AddParent = async (parentData) => {
        try {
          const token = localStorage.getItem('token');
           await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user`,
            parentData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Swal.fire({
            title: 'Parent Added',
            text: 'Parent added successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          await fetchUsers();
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };

      const handleEditUser = async (id, formData) => {
        if (!formData) return;
      
        try {
          const token = localStorage.getItem('token');
      
          const response = await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/user/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              },
            }
          );
      
          await fetchUsers();
          Swal.fire({
            title: 'Student Updated',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
      
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };


        const handleAddTeacher = async (teacherData) => {
          console.log(teacherData)
          try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/user`,
              teacherData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            Swal.fire({
              title: 'Teacher Added',
              text: 'Teacher added successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            await fetchUsers();
            setCredentials(res.data.credentials);
            
          } catch (error) {
            
            if (error.response && error.response.data) {
              Swal.fire({
                title: 'Error',
                text: error.response?.data?.message ,
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          }
        }

        


      const fetchStudentDetails = async (id) => {
        
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
               
              },
            }
          )
          
          setStudentDetails(response.data);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } 
      };
      
      

      useEffect( () => {
        fetchUsers();
      }, []);

     
    return { users, loading, error, handleDelete ,handleAddUser,AddParent,fetchStudentDetails,studentDetails, handleEditUser,credentials,handleAddTeacher};
}

export default useUserApi