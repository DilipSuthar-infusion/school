import React, { useMemo, useState } from "react";
import {
  BookmarkCheck,
  BookOpenCheck,
  Calendar1Icon,
  PenLine,
  X,
} from "lucide-react";
import useClassApi from "../../hooks/useClassApi";
import useFeeStructApi from "../../hooks/useFeeStructApi";

// Reusable Class Select Component
const ClassSelect = ({ value, onChange, Classes }) => (
  <select
    value={value}
    onChange={onChange}
    className="text-black px-2 py-2 rounded appearance-none bg-gray-200 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
  >
    <option value="">Select Class</option>
    {Classes?.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {cls.classname}
      </option>
    ))}
  </select>
);

const ManageFeeStructure = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    classId: "",
    feeType: "",
    amount: "",
  });

  const { Classes } = useClassApi();
  const { feeStructures, handleAddFeeStructure, handleDeleteFeeStruct } = useFeeStructApi();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { feeType, amount } = formData;
    if ( !feeType || !amount) {
      alert("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    await handleAddFeeStructure(formData)
    setFormData({
      classId: selectedClass,
      feeType: "",
      amount: "",
      feeFrequency: "",
    });
    setShowModal(false);
  };
 
  const sortedFeeStructure = (Array.isArray(feeStructures) ? feeStructures : [])
  .filter((feeStruct) => feeStruct.classId === selectedClass)
  .sort((a, b) => a.feeType.localeCompare(b.feeType));

  const handleDeleteExam = async(id) => {
    if (window.confirm("Are you sure you want to delete this fee structure?")) {
      await handleDeleteFeeStruct(id)
    }
  };

  if (!Classes || !feeStructures) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-3xl font-bold flex items-center">
          <Calendar1Icon className="w-8 h-8 me-2" />
          Manage Fee Structure
        </h2>

        <div className="flex justify-center items-center gap-3">
          <ClassSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            Classes={Classes}
          />
          {selectedClass && (
            <button
              onClick={() => {
                setShowModal(true);
                setFormData((prev) => ({ ...prev, classId: selectedClass }));
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              + Add Fee
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 rounded-t-3xl flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpenCheck className="w-6 h-6" />
                Add Fee Structure
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-red-200 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                 
                  <select
            name="feeType"
            value={formData.feeType}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-gray-50"
          >
            <option> Select FeeType</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Exam Fee">Exam Fee</option>
            <option value="Transport Fee">Transport Fee</option>
          </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Ex. 5000"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    value={formData.amount}
                  />
                </div>

                

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
                  >
                    Create Fee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedClass && (
        <>
          <h2 className="text-xl font-bold mb-4">
            Fee Structures for{" "}
            {Classes.find((c) => c.id === selectedClass)?.classname || "Selected Class"}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-blue-50 text-left text-blue-600 font-semibold">
                <tr>
                  <th className="px-4 py-2">Fee Type</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedFeeStructure.map((fee) => (
                  <tr key={fee.id}>
                    <td className="border border-gray-300 px-4 py-2">{fee.feeType}</td>
                    <td className="border border-gray-300 px-4 py-2">{fee.amount}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDeleteExam(fee.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedFeeStructure.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-4">
                      No Fee Structure Available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ManageFeeStructure;
