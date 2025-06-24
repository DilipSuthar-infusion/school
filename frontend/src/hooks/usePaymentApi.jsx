import axios from "axios"
import { useState } from "react"


const usePaymentApi = () => {
    const [payment, setPayment] = useState('')
  const applyPayment = async(id,formData)=>{
    try{
        const token = localStorage.getItem("token")
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/add/${id}`,{...formData},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        )
        console.log(response)
        setPayment((prev)=>[...prev, response.data])
        return{ success: true, data: response?.data?.message}
    }catch(error){
        console.log(error)
        return{ success: false, data: error?.response?.data?.message}
    }
  
    
  }
  return {applyPayment, payment}
}

export default usePaymentApi