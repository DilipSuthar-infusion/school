import React from "react";
import { FiPhone, FiMail, FiMoreVertical } from "react-icons/fi";

const StudentTable = ({
  students,
  Classes,
  loading,
  openDropdown,
  setOpenDropdown,
  setParentModel,
  setParentFromData,
  setOpen,
  setFormData,
  setEdit,
  profile,
  setAvatar,
  handleDelete,
}) => {
  console.log(students)
  return (
    <div className="overflow-auto rounded-lg shadow">
      <table className="w-full table-auto text-sm border-collapse bg-white">
        <thead className="bg-blue-50 text-left text-blue-600 font-semibold">
          <tr>
            <th className="p-3 rounded-tl-lg">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Student ID</th>
            <th className="p-3">Class</th>
            <th className="p-3">Parent</th>
            <th className="p-3">Email</th>
            <th className="p-3">DOB</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Address</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Contact</th>
            <th className="p-3 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={12} className="text-center p-12">
                Loading...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center p-12 text-gray-500">
                No students found.
              </td>
            </tr>
          ) : (
            students.filter((student) => student.role === "student").map((student, idx) => (
              <tr
                key={student.id || idx}
                className="border-b hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
              >
                <td className="p-2 w-20">
                  <img
                    src={`http://localhost:2000/${student.profilePicture}`}
                    alt="avatar"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>

                <td className="p-3 font-medium">{student.name}</td>

                <td className="p-3 text-orange-500 font-semibold">
                  {student.admissionNumber || "N/A"}
                </td>

                <td className="p-3">
                  {Classes.find((c) => c.id === student.classId)?.classname ||
                    "N/A"}
                </td>

                <td className="p-3">
                  {student.Parents && student.Parents.length > 0
                    ? student.Parents[0].name
                    : "N/A"}
                </td>

                <td className="p-3 truncate max-w-xs">{student.email}</td>

                <td className="p-3">
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-3">{student.gender || "N/A"}</td>

                <td className="p-3 truncate max-w-xs">{student.address || "N/A"}</td>

                <td className="p-3">{student.phone || "N/A"}</td>

                <td className="p-3">
                  <div className="flex gap-3 text-blue-600">
                    {student.phone && (
                      <a href={`tel:${student.phone}`} title="Call">
                        <FiPhone className="cursor-pointer hover:text-orange-500 transition" />
                      </a>
                    )}
                    {student.email && (
                      <a href={`mailto:${student.email}`} title="Email">
                        <FiMail className="cursor-pointer hover:text-orange-500 transition" />
                      </a>
                    )}
                  </div>
                </td>

                <td className="p-3 relative">

                  <FiMoreVertical
                    className="cursor-pointer"
                    aria-label="More actions"
                    onClick={() =>
                      setOpenDropdown(openDropdown === student.id ? null : student.id)
                    }
                  />

                  
                  {openDropdown === student.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setParentModel(true);
                          setParentFromData((prev) => ({
                            ...prev,
                            studentId: student.id,
                          }));
                          setOpenDropdown(null);
                        }}
                      >
                        Add Parent Details
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setOpen(true);
                          setFormData({
                            name: student.name,
                            email: student.email,
                            phone: student.phone,
                            gender: student.gender,
                            dateOfBirth: student.dateOfBirth,
                            bloodGroup: student.bloodGroup,
                            classId: student.classId,
                            address: student.address,
                            profilePicture: profile,
                          });
                          setEdit(true);
                          setAvatar(student.profilePicture ? `http://localhost:2000/${student.profilePicture}` : null);
                          setOpenDropdown(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          handleDelete(student.id);
                          setOpenDropdown(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
