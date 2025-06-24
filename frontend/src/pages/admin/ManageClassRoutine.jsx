import React, { useState, useEffect } from "react";
import useClassApi from "../../hooks/useClassApi";
import useSubjectApi from "../../hooks/useSubjectApi";
import {useAuth} from "../../Context/Authcontext";
import useClassRoutineApi from "../../hooks/useClassRoutineApi";
import { CalculatorIcon, Calendar1Icon, CalendarCheck, Clock, NotebookPen, SquarePen, Trash2, User, X } from "lucide-react";
import Swal from "sweetalert2";
import useUserApi from "../../hooks/useUserApi";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ManageClassRoutine = () => {
  const { Classes } = useClassApi();
  const { subjects } = useSubjectApi();
  const { userInfo } = useAuth();
  const { classRoutine } = useClassRoutineApi();
  const { users } = useUserApi();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ subjectId: "", teacherId: "" });
 

  const startHour = 8;
  const endHour = 15;

  const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => {
    const hour = startHour + i;
    return {
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      endTime: `${(hour + 1).toString().padStart(2, "0")}:00`,
    };
  });




  const handleSlotClick = (day, slot) => {
    const routine = classRoutine.find(
      (r) =>
        r.classId?.toString().trim() === selectedClass?.toString().trim() &&
        r.dayOfWeek?.toLowerCase().trim() === day?.toLowerCase().trim() &&
        normalizeTime(r.startTime) === normalizeTime(slot.startTime) &&
        normalizeTime(r.endTime) === normalizeTime(slot.endTime)
    );
    if (routine) {
      Swal.fire("you have already Assigned the routine")
      return; 
    }
    
    setFormData({ subjectId: "", teacherId: "" });
    setSelectedSlot({ dayOfWeek: day, ...slot });
  };




  const normalizeTime = (time) => {
    let t = time.trim();
    if (/^\d{1,2}:\d{2}$/.test(t)) {
      t = t + ":00";
    }

    if (/^\d:\d{2}(:\d{2})?$/.test(t)) {
      t = "0" + t;
    }
    return t;
  };

  const findRoutine = (day, startTime, endTime) => {
    const routine = classRoutine.find(
      (r) =>
        r.classId?.toString().trim() === userInfo.classId?.toString().trim() &&
        r.dayOfWeek?.toLowerCase().trim() === day?.toLowerCase().trim() &&
        normalizeTime(r.startTime) === normalizeTime(startTime) &&
        normalizeTime(r.endTime) === normalizeTime(endTime)
    );
    if (!routine) {
      return <div className="text-gray-400 text-xs">No routine assigned</div>;
    }
    
    const subject =
      subjects.find((s) => s.id === routine.subjectId)?.subjectName ||
      "Unknown";
    const teacher =
      users.find((u) => u.id === routine.teacherId)?.username || "Unknown";
    return (
      <div className="px-3 py-4 bg-blue-50 rounded-lg shadow-md text-sm font-semibold text-blue-800 flex gap-2 items-center justify-between transition-all duration-200 hover:shadow-lg">
        <div>
          <div className="text-lg font-medium">{subject}</div>
          <div className="text-xs text-gray-500">{teacher}</div>
        </div>
       
      </div>
    );
  };

  return (
    <div>
      <div className="flex item-center justify-between bg-white rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-3xl font-bold flex item-center justify-center">
          <Calendar1Icon className="w-8 h-8 me-2" />
          ClassRoutine
        </h2>
      </div>

        <div className="overflow-auto rounded-lg shadow">
          <div className="grid grid-cols-8 gap-px bg-gray-300 border border-gray-600 rounded-lg shadow-lg">
            <div className="p-3 text-center bg-blue-50 text-blue-600 font-semibold">
              Time / Day
            </div>
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="bg-blue-50 text-center p-3 text-blue-600 font-semibold"
              >
                {day}
              </div>
            ))}

            {timeSlots.map((slot) => (
              <React.Fragment key={slot.startTime}>
                <div className="bg-white font-semibold py-5 text-center">
                  {slot.startTime} - {slot.endTime}
                </div>

                {daysOfWeek.map((day) => (
                  <div
                    key={`${day}-${slot.startTime}`}
                    className="bg-white p-2 text-center cursor-pointer hover:bg-blue-100 transition min-h-[80px] flex justify-center items-center"
                    onClick={() => handleSlotClick(day, slot) }
                  >
                    {findRoutine(day, slot.startTime, slot.endTime)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
     
    </div>
  );
};

export default ManageClassRoutine;