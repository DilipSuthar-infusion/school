import React, { useEffect, useState } from 'react'
import axios from 'axios'
const useFeeStructApi = () => {
    const [feeStructures, setfeeStructures] = useState([])
    
    const handleAddFeeStructure = async(formData)=>{
        const token = localStorage.getItem('token')
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/fee-structures`, formData,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )

    await fetchFeeStruct()
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
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/fee-structures/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    setfeeStructures((feeStruct)=>(feeStruct.id !== id))
  }


  useEffect(()=>{
    fetchFeeStruct()
  },[])
  return {feeStructures,fetchFeeStruct, handleAddFeeStructure,handleDeleteFeeStruct}
}




export default useFeeStructApi