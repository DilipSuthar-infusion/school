import React, {  useMemo, useState } from "react";
import useUserApi from "../../hooks/useUserApi";
import useClassApi from "../../hooks/useClassApi";
import { GripVertical, ReceiptText } from "lucide-react";
import useInvoiceApi from "../../hooks/useInvoiceApi";
import Swal from "sweetalert2";
import useFeeStructApi from "../../hooks/useFeeStructApi";

const ManageInvoiceGenerate = () => {
  const { users } = useUserApi();
  const { Classes } = useClassApi();
  const { feeStructures } = useFeeStructApi();
  const {
    handleInvoice,
    allInvoice,
    invoice,
    updateStatus,
    getAllInvoice,
    handleDelete,
    getStudentInvoices,
  } = useInvoiceApi();

  const [openDropdown, setOpenDropdown] = useState("");
  const [loading, setLoading] = useState();
  const [selectedClass, setSelectedClass] = useState("");
  const students = users.filter((user) => user.role == "student");
  const filteredStudent = useMemo(() => {
    return students.filter((student) => student.classId == selectedClass);
  });
  const [openInvoiceDetail, setOpenInvoiceDetail] = useState(null);

  const handleInvoiceGenerate = async (id) => {
    const { error, data, success } = await handleInvoice(id);
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
  };

  const handleInvoiceDelete = async (id) => {
    const { error, data, success } = await handleDelete(id);
     allInvoice.filter((inv)=>inv.id !== id)
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
   
  };


  const handlegetStudentInvoiceDetail = async (id) => {
    await getStudentInvoices(id);
  };

 

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 items-start justify-between bg-white rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-xl md:text-3xl text-gray-800 flex items-center ">
          <ReceiptText className="w-8 h-8 me-2" />
          Manage Fee Structure
        </h2>

        <div className="flex justify-center items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="outline-0 bg-gray-200 rounded px-2 py-2 appearance-none text-center focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {Classes.map((cls, idx) => (
              <option key={idx} value={cls.id}>
                {cls.classname}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!selectedClass ? (
        <div className="bg-white shadow-sm py-12 rounded-lg text-center">
          <h3>Please Select Class</h3>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg shadow">
          <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
            <thead className="bg-blue-50 text-left text-blue-600 font-semibold">
              <tr className="text-center">
                <th className="sm:p-1 md:p-3">SR. No.</th>
                <th className="p-3 rounded-tl-lg">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Class</th>
                <th className="p-3">Father Name</th>
                <th className="p-3">Mother Name</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={14} className="text-center p-12">
                    Loading...
                  </td>
                </tr>
              ) : filteredStudent.length === 0 ? (
                <tr>
                  <td colSpan={14} className="text-center p-12 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudent.map((student, idx) => (
                  <tr
                    key={student.id || idx}
                    className="text-center hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
                  >
                    <td className="p-3 font-medium">{idx + 1}</td>
                    <td className="p-2 w-20">
                      <img
                        src={`http://localhost:2000/${student.profilePicture}`}
                        alt="avatar"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 font-medium">{student.username}</td>
                    <td className="p-3 text-orange-500 font-semibold">
                      {student.admissionNumber || "N/A"}
                    </td>
                    <td className="p-3">
                      {Classes.find((c) => c.id === student.classId)?.classname ||
                        "N/A"}
                    </td>
                    <td className="p-3">
                      {student.Parents?.[0]?.username || "N/A"}
                    </td>
                    <td className="p-3">
                      {student.Parents?.[0]?.motherName || "N/A"}
                    </td>

                    <td className="p-3">
                      {(() => {
                        const studentInvoices = allInvoice?.filter(
                          (invoice) => invoice.studentId === student.id
                        );
                        

                        if (studentInvoices.length === 0) {
                          return (
                            <span className="text-red-600 font-semibold">
                              Fee Not Assigned
                            </span>
                          );
                        }

                        const hasPaid = studentInvoices.some(
                          (inv) => inv.status === "paid"
                        );

                        return hasPaid ? (
                          <span className="text-green-600 font-semibold">
                            Fee Assigned (Paid)
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            Fee Assigned (Pending)
                          </span>
                        );
                      })()}
                    </td>

                    <td className="ps-10 relative">
                      <GripVertical
                        className="cursor-pointer w-5"
                        aria-label="More actions"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === student.id ? null : student.id
                          )
                        }
                      />

                      {openDropdown === student.id && (
                        <div className="absolute right-17 mt-2 w-42 bg-gray-100 border-2 border-gray-200 rounded shadow-md z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                              handleInvoiceGenerate(student.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Generate Invoice
                          </button>

                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 "
                            onClick={() => {
                              handlegetStudentInvoiceDetail(student.id);
                              setOpenInvoiceDetail(true);
                            }}
                          >
                            View Invoice
                          </button>

                          <button
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            onClick={() => {
                              handleInvoiceDelete(student.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Delete Invoice
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
      )}


      {openInvoiceDetail && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-[90%] sm:w-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Fee Details
                </h2>
                <button
                  onClick={() => setOpenInvoiceDetail(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Sr.No.
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Fee Type
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Fee Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice ? (
                      invoice.fees && invoice.fees.length > 0 ? (
                        invoice.fees.map((fee, index) => (
                          <tr
                            key={`fee-${fee.id || index}`}
                            className="hover:bg-gray-50"
                          >
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{fee.feeType}</td>
                            <td className="py-2 px-4">{fee.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="text-center py-2 text-gray-500"
                          >
                            No Fee Structures
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-2 text-red-500"
                        >
                          No Data Found
                        </td>
                      </tr>
                    )}

                    {invoice?.invoices?.map((inv, idx) => (
                      <React.Fragment key={`invoice-${inv.id || idx}`}>
                        <tr className="hover:bg-gray-50 font-semibold bg-gray-100">
                          <td
                            colSpan={2}
                            className="py-2 px-4 border-b border-gray-300 text-right"
                          >
                            Total Amount:
                          </td>
                          <td className="py-2 px-4 border-b border-gray-300">
                            ₹ {inv.totalAmount}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 font-semibold bg-gray-100">
                          <td
                            colSpan={2}
                            className="py-2 px-4 border-b border-gray-300 text-right"
                          >
                            Paid Amount:
                          </td>
                          <td className="py-2 px-4 border-b border-gray-300">
                            ₹ {inv.paidAmount || 0.0}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 font-semibold bg-gray-100">
                          <td
                            colSpan={2}
                            className="py-2 px-4 border-b border-gray-300 text-right"
                          >
                            Fee Status:
                          </td>
                          <td className="py-2 px-4 border-b border-gray-300">
                            {inv.paidAmount > 0 ? (
                              <>
                                <ChangeStatus
                                  invoice={inv.id}
                                  updateStatus={updateStatus}
                                />{" "}
                              </>
                            ) : (
                              <>{inv.status} </>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManageInvoiceGenerate;

export const ChangeStatus = ({ invoice, updateStatus }) => {
  const [paymentStatus, setPaymentStatus] = useState(invoice.status);
  const handleUpdateStatus = async () => {
    const { data, success, error } = await updateStatus(invoice);
    if (success) {
      Swal.fire({
        icon: "success",
        text: data,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          text: "swal-small-text",
          confirmButton: "swal-small-btn",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }
  };
  return (
    <>
      <select
        name="status"
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
      >
        <option value="unpaid">Unpaid</option>
        <option value="paid">Paid</option>
      </select>
      <button
        type="submit"
        onClick={() => handleUpdateStatus()}
        className="border-1 rounded px-1 py-1 ms-1"
      >
        Update
      </button>
    </>
  );
};
