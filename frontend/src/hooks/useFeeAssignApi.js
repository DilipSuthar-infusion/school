import axios from "axios";
import { useEffect, useState } from "react";

const useFeeAssignApi = () => {
    const [feeAssign, setfeeAssign] = useState([])
 
  const handleAssignFee = async (id) => {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/fees/${id}`,
         {}, 
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       return {success: true, message: response?.data?.message }
    }catch(error){
      return {success: false, message: error?.response?.data?.error}
    }
    
    
  };

  const fetchFeeAssign = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/fees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setfeeAssign(res.data?.data || res.data);
    } catch (error) {
      console.error("Error fetching fee assignments:", error);
    }
  }
  

  useEffect(()=>{fetchFeeAssign()},[])


  return { handleAssignFee,feeAssign };
};

export default useFeeAssignApi;
