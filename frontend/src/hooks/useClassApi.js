import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const useClassApi = () => {
    const [Classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleAddClass = async (formData) => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/classes`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          handlefetchClasses();
          setLoading(false);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };

      const handleDelete = async (id) => {

        try {
          const token = localStorage.getItem('token');
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/classes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClasses(Classes.filter(classObj => classObj.id !== id));
          
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };


      const handlefetchClasses = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setClasses(response.data);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };



      const handleEditClass = async (id, formData) => {
        try {
          const token = localStorage.getItem('token');
          await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/classes/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await handlefetchClasses();
          setLoading(false);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };


      const handleAssignClassTeacher = async (classTeacherData) => {
        try{
          const token = localStorage.getItem('token');
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/classes/assign-teacher`,
            classTeacherData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );
         await handlefetchClasses()
        }catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }

      useEffect(() => {
        handlefetchClasses();
      }, []);

  return  { handleAddClass, handleDelete ,handlefetchClasses,handleEditClass , handleAssignClassTeacher, Classes};
}

export default useClassApi