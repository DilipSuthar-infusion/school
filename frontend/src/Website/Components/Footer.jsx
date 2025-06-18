import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import logo from '../../assets/Images/logo.png'
const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-blue-600 to-purple-600 text-white  pt-16 pb-4 md:pb-8">
     <div className="px-8 sm:px-20 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
  <div>
    <img src={logo} className="w-20 mb-3" alt="School Logo" />
    <p>
      We believe education is not just about academics — it's about nurturing
      confident, creative, and compassionate individuals.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-semibold mb-3 md:mb-4">Quick Links</h3>
    <ul className="space-y-2 ps-0">
      <li>About Us</li>
      <li>Our Gallery</li>
      <li>FAQ</li>
      <li>Contact Us</li>
    </ul>
  </div>

  <div>
    <h3 className="text-xl font-semibold mb-3 md:mb-4">Contact Us</h3>
    <ul className="space-y-3 text-sm ps-0">
      <li className="flex items-center gap-2">
        <Phone className="text-orange-400 w-5" /> +91-7894561231
      </li>
      <li className="flex items-center gap-2">
        <Mail className="text-orange-400 w-5" /> infoapollointernational@gmail.com
      </li>
      <li className="flex items-start gap-2">
        <MapPin className="text-orange-400 w-5 mt-1" />
        <span>
          Loyola Hall, Naranpura,<br />
          Ahmedabad, Gujarat 380013.
        </span>
      </li>
    </ul>
  </div>

  <div>
    <h3 className="text-xl font-semibold mb-3 md:mb-4">Find Us on Map</h3>
    <div className="w-full h-44 rounded-xl overflow-hidden">
      <iframe
        title="School Location"
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


      <div className="mt-12 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Apollo International School. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
