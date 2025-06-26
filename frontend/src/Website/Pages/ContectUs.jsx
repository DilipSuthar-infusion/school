import React, { useState } from "react";
import { BookOpen, Mail, MapPin, Pen, Phone, User } from "lucide-react";
import Breadcrumb from "../Components/Breadcrumb";
import axios from "axios";
import Swal from "sweetalert2";

const ContectUs = () => {
  const [formData, setFormData] = useState({
    Username:"",
    Email:"",
    Phone:"",
    Subject:"",
    Message:""

  })
  const [error, setError] = useState([])

  const handleChange = (e)=>{
    const {name, value}= e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  const handleValidate=()=>{
    let newErrors = [];
    if(!formData.Username){
       newErrors.Username='username is Required'
    }
    if(formData.Username.length < 3){
      newErrors.Username='username must be greater then 3'
    }
    if(!formData.Email){
      newErrors.Email = "Email is Required"
    }
    if(formData.Phone <= 10){
      newErrors.Phone = 'Phone number must be 10 digits'
    }
    if(!formData.Subject){
      newErrors.Subject = 'Subject is Required'
    }
    if(!formData.Message){
      newErrors.Message = 'Message is Required'
    }
    setError(newErrors)
    return Object.keys(newErrors).length == 0
  } 



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!handleValidate()){
      return
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/submitInquiry`,
        formData 
      );


      if (response.data.success) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#f97316",
          customClass: {
            popup: 'swal-small-popup',
            title: 'swal-small-title',
            text: 'swal-small-text',
            confirmButton: 'swal-small-btn',
          }
        })
        setFormData({ Username: "", Email: "", Phone: "",Subject:"", Message: "" }); 
      } else if(response.data.error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          text: error.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#f97316",
          customClass: {
            popup: 'swal-small-popup',
            title: 'swal-small-title',
            text: 'swal-small-text',
            confirmButton: 'swal-small-btn',
          }
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: 'swal-small-popup',
          title: 'swal-small-title',
          text: 'swal-small-text',
          confirmButton: 'swal-small-btn',
        }
      })
    }
  };
  return (
    <>
    <Breadcrumb label={'Contact Us'}/>
    <section className="md:w-full bg-gray-50 py-12 px-4 lg:px-20">
      <div className="md:max-w-8xl mx-auto">
        <h2 className="text-2xl lg:text-5xl md:text-4xl font-medium text-center mb-4 text-blue-700">Let's Connect With Us</h2>
        <p className="text-center text-gray-600 px-3  mb-10">
          We'd love to hear from you! Whether you have a question about admissions, programs, or anything else — our team is ready to help.
        </p>

        <div className="flex flex-col md:justify-center md:flex-row md:px-5 gap-5 mx-auto md:gap-10 mt-10">
          <form className="bg-white shadow-lg rounded-lg p-3 space-y-5 md:w-90 lg:p-6 lg:w-150" onSubmit={handleSubmit}>
            <div>
              <label className="block font-sm mb-1 text-blue-500"><User className="float-left w-3 me-1" />Full Name</label>
              <input
              name="Username"
              value={formData.Username}
              onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-200 bg-gray-100 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {error?.Username && <p className="text-sm text-red-500">{error.Username}</p>}
            </div>

            <div>
              <label className="block font-sm mb-1 text-blue-500"><Mail className="float-left w-3 me-1"/> Email Address</label>
              <input
              name="Email"
              value={formData.Email}
              onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-200 bg-gray-100 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {error?.Email && <p className="text-sm text-red-500">{error.Email}</p>}
            </div>

            <div>
              <label className="block font-sm mb-1 text-blue-500"><Phone className="float-left w-3 me-1"/> Phone Number</label>
              <input
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-gray-200 bg-gray-100 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {error?.Phone && <p className="text-sm text-red-500">{error.Phone}</p>}
            </div>

            <div>
              <label className="block font-sm mb-1 text-blue-500"><BookOpen className="float-left w-3 me-1"/> Subject</label>
              <input
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
                type="text"
                placeholder="What is your inquiry about?"
                className="w-full border border-gray-200 bg-gray-100 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {error?.Subject && <p className="text-sm text-red-500">{error.Subject}</p>}
            </div>

            <div>
              <label className="block font-sm mb-1 text-blue-500"><Pen className="float-left w-3 me-1"/> Message</label>
              <textarea
              name="Message"
              value={formData.Message}
              onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-200 bg-gray-100 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
              {error?.Message && <p className="text-sm text-red-500">{error.Message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-2 px-4 rounded transition-all"
            >
              Submit Inquiry
            </button>
          </form>

          <div className="bg-white shadow-lg rounded-lg p-5 space-y-6 lg:w-150">
            <div className="flex items-start gap-4">
              <Phone className="text-blue-500 mt-1 w-4" />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Phone</h4>
                <p className="text-medium">+91-7894561231</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-500 mt-1 w-4" />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Email</h4>
                <p className="text-medium">InfoapolloInter@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-blue-500 mt-1 w-4" />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Address</h4>
                <p className="text-medium">
                  Loyola Hall, Naranpura,
                  <br />
                  Ahmedabad, Gujarat 380013
                </p>
              </div>
            </div>

            <div className="w-full h-48 mt-4 rounded overflow-hidden">
              <iframe
                title="School Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.181043907259!2d72.834657!3d19.1368466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b65f95b1e0ab%3A0x9f5e3f786a6b5c1e!2sYour%20School%20Name!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContectUs;
