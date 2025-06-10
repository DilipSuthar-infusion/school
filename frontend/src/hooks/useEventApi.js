import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const useEventApi = () => {
    const [Events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleAddEvent = async (formData) => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/events`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          handlefetchEvents();
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
        console.log(id)
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/events/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEvents(Events.filter(eventObj => eventObj.id !== id));
          
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };


      const handlefetchEvents = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
          setEvents(response.data);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };



      const handleEditEvent = async (id,formData) => {
        try {          
          const token = localStorage.getItem('token');
          await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/events/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await handlefetchEvents();
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

      useEffect(() => {
        handlefetchEvents();
      }, []);

  return  { handleAddEvent, handleDelete ,handlefetchEvents,handleEditEvent ,loading, Events};  
}

export default useEventApi