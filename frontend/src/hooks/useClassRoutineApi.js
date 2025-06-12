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
    console.log(JSON.stringify(formData))
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
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add routine');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteRoutineApi = async (routineId) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines/${routineId}`,
        {
          headers: getHeaders(),
        }
      );
      
      setClassRoutine(prev => 
        prev.filter(routine => routine.id !== routineId)
      );
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete routine');
      throw err;
    } finally {
      setLoading(false);
    }
  };



  const fetchClassRoutine = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/classroutines`,
        {
          headers: getHeaders(),
        }
      );
      
     
      setClassRoutine(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch class routines');
      console.error('Failed to fetch class routines', err);
    } finally {
      setLoading(false);
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