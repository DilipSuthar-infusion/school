import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplyPaymentModal from "./ApplyPaymentModal";

const StudentInvoices = ({ userId }) => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await axios.get(`/api/invoices/student/${userId}`);
      setInvoices(res.data);
    };
    fetchInvoices();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Invoices</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">Total</th>
            <th className="p-2">Paid</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, index) => (
            <tr key={inv.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{inv.totalAmount}</td>
              <td className="p-2">{inv.paidAmount}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2">
                {inv.status !== "paid" && (
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <ApplyPaymentModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default StudentInvoices;
