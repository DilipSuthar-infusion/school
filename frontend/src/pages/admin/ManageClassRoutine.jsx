import React, { useState, useEffect } from "react";
import useClassApi from "../../hooks/useClassApi";
import useSubjectApi from "../../hooks/useSubjectApi";
import useUserApi from "../../hooks/useUserApi";
import useClassRoutineApi from "../../hooks/useClassRoutineApi";
import { Calendar1Icon, SquarePen, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";

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
  const { users } = useUserApi();
  const { classRoutine, handleAddRoutine, handleDeleteRoutineApi, fetchClassRoutine } = useClassRoutineApi();

  const [selectedClass, setSelectedClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ subjectId: "", teacherId: "" });
  const [isEditing, setIsEditing] = useState(false);

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
    // If no routine exists, open the modal for adding a new routine
    setFormData({ subjectId: "", teacherId: "" });
    setSelectedSlot({ dayOfWeek: day, ...slot });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


 
  const handleDeleteClick = async (e, routineId) => {
    e.stopPropagation();
  
    const result = await Swal.fire({
      title: "Do you want to delete this routine?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
  
    if (result.isConfirmed) {
      await handleDeleteRoutineApi(routineId);
      await fetchClassRoutine();
      Swal.fire("Deleted!", "Routine has been deleted.", "success");
    } 
  }
  



  const handleSubmit = async () => {
    if (!formData.subjectId || !formData.teacherId) {
      alert("Please select both a subject and a teacher.");
      return;
    }

    const payload = {
      ...selectedSlot,
      ...formData,
      classId: selectedClass,
    };

      await handleAddRoutine(payload);
      await fetchClassRoutine();
      setModalOpen(false);
  
    }

   
  

 

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
        r.classId?.toString().trim() === selectedClass?.toString().trim() &&
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
        <div className="flex">
        

          <button
            className="hover:bg-red-200 p-1 rounded transition-colors duration-200"
            onClick={(e) => handleDeleteClick(e, routine.id)}
            aria-label="Delete routine"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>

        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex item-center justify-between bg-white rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-3xl font-bold flex item-center justify-center">
          <Calendar1Icon className="w-8 h-8 me-2" />
          Manage Class Routine
        </h2>

        <div className="flex justify-center item-center">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-black px-2 py-2 rounded appearance-none bg-gray-200 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
          >
            <option value="">Select Class</option>
            {Classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.classname}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedClass && (
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
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="font-semibold text-lg">
                {isEditing ? "Edit Routine" : "Assign Routine"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X />
              </button>
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Day</label>
              <input
                type="text"
                value={selectedSlot.dayOfWeek}
                disabled
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Time</label>
              <input
                type="text"
                value={`${selectedSlot.startTime} - ${selectedSlot.endTime}`}
                disabled
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Subject</label>
              <select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Teacher</label>
              <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Teacher</option>
                {users
                  .filter((u) => u.role === "teacher")
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={!formData.subjectId || !formData.teacherId}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClassRoutine;
