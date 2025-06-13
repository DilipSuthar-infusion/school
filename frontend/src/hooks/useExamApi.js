import axios from 'axios'
import { useEffect, useState } from 'react'

const useExamApi = () => {
const [exams, setExams] = useState([])
   const handleAddExam = async(formData) =>{

    const token = localStorage.getItem('token')
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/exams`,
        formData,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    await fetchExams()
   
   }

   const fetchExams = async() =>{
    const token = localStorage.getItem('token')
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/exams`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    setExams(response.data)
   }


   const handleDeleteExam = async(id) =>{
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/exams/${id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    )
    setExams(exams.filter((exam)=> exam.id !== id))
   }
   


   useEffect(()=>{
    fetchExams()
   },[])
   return { handleAddExam, exams, handleDeleteExam}
}

export default useExamApi