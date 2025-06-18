import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const useAttendenceApi = () => {
  const [attendance, setAttendance] = useState([])
     const markBulkAttendance =async(classId, date, attendanceRecords)=>{
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/attendance/bulk`,
                    {
                      classId,
                      date,
                      attendanceRecords,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                Swal.fire({
                    title: 'Saved'
                })
              } catch (error) {
                Swal.fire({
                  title: 'Error',
                  text: error.response?.data?.message || error.message,
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
        }


        const getAttendanceData = async()=>{
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/attendance`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              
              setAttendance(response.data)
          
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: error.response?.data?.message || error.message,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }


        const deleteAttendanceByDate = async (studentId, date) => {
          try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`/api/attendance/${studentId}?date=${date}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return res.data;
          } catch (err) {
            console.error("Delete error:", err);
            throw err;
          }
        };

        useEffect(() => {
          getAttendanceData();
        }, []);
        return {markBulkAttendance , attendance,deleteAttendanceByDate}
}

export default useAttendenceApi