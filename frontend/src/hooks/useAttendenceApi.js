import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const useAttendenceApi = () => {
  const [attendance, setAttendance] = useState([])
     const markBulkAttendance =async(classId, date, attendanceRecords)=>{
            try {
                const token = localStorage.getItem('token');
             const response = await axios.post(
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
                setAttendance(prev => [...prev, attendanceRecords]);
                return { success: true, data: response?.data?.message };
              } catch (error) {
                return { success: false, error: error?.response?.data?.message};
              }
        }


        const getAttendanceData = async()=>{
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
        }


        const deleteAttendanceByDate = async (studentId, date) => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/attendance/${studentId}?date=${date}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setAttendance((attendance)=>attendance.studentId !== studentId)
            return { success: true, data: response?.data?.message };
          } catch (error) {
            return { success: false, error: error?.response?.data?.message};
          }
        };

        useEffect(() => {
          getAttendanceData();
        }, []);
        return {markBulkAttendance , attendance,deleteAttendanceByDate}
}

export default useAttendenceApi;