import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const useStudyMeterialApi = () => {
  const [studyMeterial, setStudyMeterial] = useState([]);
const  [studentMeterial, setStudentMeterial] = useState([])


  const handleCreateStudyMeterial = async(formData)=>{
    try {
        const token = localStorage.getItem('token');
       const res =  await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/studymaterials`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
  }

  const fetchAllStudyMeterial = async (classId, subjectId) => {
    try {
      const token = localStorage.getItem('token');
  
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/studymaterials`,
        {
          params: {
            classId: classId,
            subjectId: subjectId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setStudyMeterial(res.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  


  const fetchMeterial = async()=>{
    try {
        const token = localStorage.getItem('token');
    
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/studymaterials`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudentMeterial(res.data)
        
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
  }
  useEffect(()=>{
    fetchMeterial()
  },[])


  return { handleCreateStudyMeterial, studyMeterial, fetchAllStudyMeterial,studentMeterial}
}

export default useStudyMeterialApi