import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const useClassApi = () => {
    const [Classes, setClasses] = useState([]);

    const handleAddClass = async (formData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/classes`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Swal.fire({
            title: 'Class Added',
            text: 'Class added successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          ;
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
          const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/class/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClasses(classes.filter(classObj => classObj.id !== id));
          
        } catch (error) {
          console.error('Error deleting class:', error.response?.data || error.message);
        }
      };


      const handlefetchClasses = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClasses(response.data);
        } catch (error) {
          console.error('Error fetching classes:', error.response?.data || error.message);
        }
      };

      useEffect(() => {
        handlefetchClasses();
      }, []);

  return  { handleAddClass, handleDelete ,handlefetchClasses , Classes};
}

export default useClassApi