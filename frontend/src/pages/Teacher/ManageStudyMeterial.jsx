import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useClassApi from "../../hooks/useClassApi";
import useUserApi from "../../hooks/useUserApi";
import {
  Calendar,
  Camera,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  X,
} from "lucide-react";
import useSubjectApi from "../../hooks/useSubjectApi";
import useStudyMeterialApi from "../../hooks/useStudyMeterialApi";

const ManageStudyMeterial = () => {
  const { Classes } = useClassApi();
  const { subjects } = useSubjectApi();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [meterial, setMeterial] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classId: "",
    filePath: null,
    subjectId: "",
  });
  const [filters, setFilters] = useState({
    classId: "",
    subjectId: "",
  });

  const { handleCreateStudyMeterial, studyMeterial, fetchAllStudyMeterial } =
    useStudyMeterialApi();
  const closeStudentModal = () => {
    setFormData({
      title: "",
      description: "",
      classId: "",
      filePath: null,
      subjectId: "",
    });
    setMeterial(null);
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const fileName = e.target.files[0];
    if (fileName) {
      setFile(fileName);
      setMeterial(URL.createObjectURL(fileName));
      setFormData((prev) => ({ ...prev, filePath: fileName }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studyData = new FormData();
    studyData.append("title", formData.title);
    studyData.append("description", formData.description);
    studyData.append("classId", formData.classId);
    studyData.append("subjectId", formData.subjectId);
    studyData.append("filePath", file);
    await handleCreateStudyMeterial(studyData);
    closeStudentModal();
    fetchAllStudyMeterial(filters.classId, filters.subjectId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchAllStudyMeterial(filters.classId, filters.subjectId);
  }, [filters]);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4 sm:p-1 md:p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 border rounded px-3 py-2 w-1/3">
          <FiSearch />
          <input
            type="text"
            placeholder="Search Study Material..."
            className="outline-none bg-transparent w-full"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              name="classId"
              value={filters.classId}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">All Classes</option>
              {Classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.classname}
                </option>
              ))}
            </select>

            <select
              name="subjectId"
              value={filters.subjectId}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subjectName}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-200"
            onClick={() => setOpen(true)}
          >
            + Add Study Material
          </button>
        </div>
      </div>

      <div className="mt-5">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
          {studyMeterial.map((study, index) => (
  <tr key={index}>
    <td className="border px-4 py-2">{study.title}</td>
    <td className="border px-4 py-2">{study.description}</td>
    <td className="border px-4 py-2">{study.class?.name || study.class?.classname}</td>
    <td className="border px-4 py-2">{study.subject?.name || study.subject?.subjectName}</td>
    <td className="border px-4 py-2">{study.teacher?.username}</td>
    <td className="border px-4 py-2">
  <a
    href={study.filePath}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 underline"
    download
  >
    Download
  </a>
</td>
  </tr>
))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeStudentModal}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Study Material</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">Select Class</option>
                {Classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.classname}
                  </option>
                ))}
              </select>
              <select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.subjectName}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.image/*"
                onChange={handleFileChange}
                required
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudyMeterial;
