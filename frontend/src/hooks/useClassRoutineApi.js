import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useClassRoutineApi = () => {
  const [classRoutine, setClassRoutine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const getToken = () => {
    return localStorage.getItem('token');
  };


  const getHeaders = () => {
    const token = getToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const handleAddRoutine = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines`,
        formData,
        {
          headers: getHeaders(),
        }
      );
      
      setClassRoutine(prev => [...prev, response.data]);
      await fetchClassRoutine()
      return {success:true, data:response?.data?.message}
    } catch (err) {
      return {success:false, data:err?.response?.data?.message}
    }
  }
  


  const handleDeleteRoutineApi = async (routineId) => {
    try {
      setLoading(true);
      setError(null);
      
   const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines/${routineId}`,
        {
          headers: getHeaders(),
        }
      );
      
      setClassRoutine(prev => 
        prev.filter(routine => routine.id !== routineId)
      );
      
      return {success:true, data:response?.data?.message}
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete routine');
      throw err;
    } finally {
      setLoading(false);
    }
  };



  const fetchClassRoutine = async () => {
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines`,
        {
          headers: getHeaders(),
        }
      );
      
     
      setClassRoutine(response.data);
      return {success:true, data:response?.data?.message}
    } catch (err) {
      return {success:false, data:err?.response?.data?.message}
    }
  };



 
  useEffect(() => {
    fetchClassRoutine();
  }, []);

  return {
    classRoutine,
    loading,
    error,
    handleAddRoutine,
   
    handleDeleteRoutineApi,
    fetchClassRoutine,
  };
};

export default useClassRoutineApi;  
