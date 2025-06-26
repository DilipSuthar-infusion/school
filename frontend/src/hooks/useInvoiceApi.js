import axios from "axios"
import { useEffect, useState } from "react"

const useInvoiceApi = () => {
  const [invoice, setInvoice] = useState([])
  const [allInvoice, setAllInvoice] = useState([])
  
  
  const handleInvoice = async(id)=>{
    try{
        const token = localStorage.getItem("token")
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/invoice/add/${id}`,{},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        )
        setInvoice((prev)=>[...prev, response.data])
        getAllInvoice()
        return{ success: true, data: response?.data?.message}
    }catch(error){
        return{ success: false, error: error?.response?.data?.message}
    }
  
  }


  const getAllInvoice = async()=>{
    const token = localStorage.getItem("token")
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/invoice`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    setAllInvoice(response.data)
  }
  




  const handleDelete = async(id)=>{
    try{
      const token = localStorage.getItem("token")
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/invoice/${id}`,
          {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
      )
      
      
      await getAllInvoice()
      return {success:true , data: response?.data?.message}
    }catch(error){
      return {success:false, error: error?.response?.data?.message}
    }
    
  }











  const getStudentInvoices= async(id)=>{

        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/invoice/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        )
        
        setInvoice(response.data)
      }




    const updateStatus = async(id)=>{
      try{
        const token = localStorage.getItem("token")
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/invoice/${id}`,{},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        )
        
        setInvoice(response.data)
        return{sucess:true, data:response?.data?.message}
    }catch(error){
     return {sucess :false, error:error?.response?.data?.error}
    }
    }

    useEffect(()=>{
      getAllInvoice()
    },[])

  

  
  return{ invoice, getStudentInvoices, handleInvoice, allInvoice, getAllInvoice, handleDelete,updateStatus}

}

export default useInvoiceApi