import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Breadcrumb from "../Components/Breadcrumb";

const ContectUs = () => {
  return (
    <>
    <Breadcrumb label={'Contact Us'}/>
    <section className="w-full bg-gray-50 py-12 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-700">Let's Connect With Us</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          We'd love to hear from you! Whether you have a question about admissions, programs, or anything else — our team is ready to help.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Inquiry Form */}
          <form className="bg-white shadow-lg rounded-lg p-6 space-y-5">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="What is your inquiry about?"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
            >
              Submit Inquiry
            </button>
          </form>

          {/* Contact Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p>+91-7894561231</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p>infoapollointernational@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Address</h4>
                <p>
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
