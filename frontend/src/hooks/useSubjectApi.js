import axios from 'axios'
import React from 'react'

const useSubjectApi = () => {
   const [loading, setLoading] = React.useState(false)
   const [subjects, setSubjects] = React.useState([])



   const handleAddSubject = async (subjectData) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/subjects`,
            subjectData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      setSubjects(res.data)
      await fetchSubjects()
    } catch (error) {
      console.log(error)
    }
  }  



  const handleSubjectDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubjects(subjects.filter(student => student.id !== id));
      
    } catch (error) {
      console.log(error)
    }
  }


  const fetchSubjects = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/subjects`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
      )
      setSubjects(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }





  React.useEffect(() => {
    fetchSubjects()
  }, [])

   return { subjects, loading, handleAddSubject,handleSubjectDelete }
}

export default useSubjectApi