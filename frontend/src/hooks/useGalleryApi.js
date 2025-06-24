
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'

const useGalleryApi = () => {
  const [gallery, setGallery] = useState([]);
  
  
  
  const handleAddGallery = async (formData) => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/gallery`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setGallery((prev) => [...prev, response?.data]);
      return { success: true, data: response?.data.message };
    } catch (error) {
      
      return { success: false, error: error?.response?.data?.message };
    }
  };


  const fetchGallery = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
      setGallery(response?.data);
  };

  const handleDeleteGallery = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGallery((prev) => prev.filter((item) => item.id !== id));
      return { success: true, data: response?.data.message };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    }
  };


  useEffect(() => {
    fetchGallery();
  }, [gallery]);

  return { handleAddGallery, fetchGallery, gallery, handleDeleteGallery };
}

export default useGalleryApi