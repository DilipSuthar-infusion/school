import {  KeyRound, Lock, Mail, X } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useUserApi from "../hooks/useUserApi";



const UpdatePasswordModal = ({ setOpen }) => {
    const {handleUpdatePassword} = useUserApi();
  const [passData, setPassData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!passData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(passData.email))
      newErrors.email = "Invalid email";

    if (!passData.oldPassword) newErrors.oldPassword = "Old password is required";
    if (!passData.newPassword) newErrors.newPassword = "New password is required";
    if (passData.newPassword !== passData.confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        const {confirmNewPassword, ...formData} = passData;
        const { error, data, success } = await handleUpdatePassword(formData);

        if (success) {
          await Swal.fire({
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
          setOpen(false); 
        } else {
          await Swal.fire({
            icon: "error",
            title: error || "Error",
            text: "Something went wrong!",
          });
        }
    } 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-lg">
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl px-3 py-4">
        
        <h3 className="text-2xl font-semibold text-center text-white"><KeyRound className="float-left me-2 mt-2"/>Update Password</h3>
        <X
          className="h-6 w-6 text-white right-4 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 p-4">

          <div>
            <label className="block text-sm font-medium text-gray-700"><Mail className="w-4 h-4 text-blue-600 float-left me-1" />Email</label>
            <input
              name="email"
              type="email"
              value={passData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Lock className="w-4 h-4 text-blue-600 float-left me-1"/> Old Password
            </label>
            <input
              name="oldPassword"
              type="password"
              value={passData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
            )}
          </div>

 
          <div>
            <label className="block text-sm font-medium text-gray-700">
             <KeyRound className="w-4 h-4 text-blue-600 float-left me-1"/> New Password
            </label>
            <input
              name="newPassword"
              type="password"
              value={passData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">
            <KeyRound className="w-4 h-4 text-blue-600 float-left me-1"/> Confirm New Password
            </label>
            <input
              name="confirmNewPassword"
              type="password"
              value={passData.confirmNewPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>


          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-indigo-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
