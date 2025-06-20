import React, { useEffect, useState } from 'react'
import axios from 'axios'
const useFeeStructApi = () => {
    const [feeStructures, setfeeStructures] = useState([])
    
    const handleAddFeeStructure = async(formData)=>{
      try{
        const token = localStorage.getItem('token')
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/fee-structures`, formData,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )

    await fetchFeeStruct()
    return {success: true, data: response?.data?.message}
    }catch(error){
      return{ success: false, error:error?.response?.data?.message}
    }
  }



    const fetchFeeStruct = async() =>{
    const token = localStorage.getItem('token')
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/fee-structures`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    setfeeStructures(response.data)
  }

  const handleDeleteFeeStruct = async(id) =>{
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/fee-structures/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    setfeeStructures(feeStructures.filter(feeStruct => feeStruct.id !== id));
    return{success:true, data: response?.data?.message}
  }


  useEffect(()=>{
    fetchFeeStruct()
  },[])
  return {feeStructures,fetchFeeStruct, handleAddFeeStructure,handleDeleteFeeStruct}
}




export default useFeeStructApi