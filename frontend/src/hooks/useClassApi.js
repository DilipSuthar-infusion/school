import axios from "axios";
import { useEffect, useState } from "react";


const useClassApi = () => {
    const [Classes, setClasses] = useState([]);
    const [teacherClass, setTeacherClass] =useState([])
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
          handlefetchClasses();
          
  
          return { success: true, data: response?.data?.message };
        } catch (error) {
          return { success: false, error: error.response?.data?.message };
          
        }
      };

      const handleDelete = async (id) => {

        try {
          const token = localStorage.getItem('token');
          const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/classes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClasses(Classes.filter(classObj => classObj.id !== id));
          return {success: true, data: response?.data?.message}
        } catch (error) {
          return { success: false, error: error.response?.data?.message };
        }
      };


      const handlefetchClasses = async () => {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         
          setClasses(response.data);
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
         
          return { success: true, data: response?.data?.message }
        } catch (error) {
          return { success: false, error: error?.response?.data?.message };
        }
        
      };


      const handleAssignClassTeacher = async (classTeacherData) => {
        try{
          const token = localStorage.getItem('token');
          const response = await axios.post(
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
         return {success: true, data: response.data}
        } catch (error) {
          return { success: false, error: error.response?.data?.message };
        }
        
      }
      const fetchTeacherClass = async()=>{
        try{
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes/teacherclass`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTeacherClass(response.data)
          
        }catch(error){
          console.log(error)
        }
       
          
      }

      useEffect(() => {
        handlefetchClasses();
        
      }, []);

  return  { handleAddClass, handleDelete ,handlefetchClasses,handleEditClass , handleAssignClassTeacher, Classes, fetchTeacherClass, teacherClass};
}

export default useClassApi