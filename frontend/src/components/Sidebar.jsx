// Sidebar.jsx
import React, { useState } from 'react';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaBars, FaChevronRight } from 'react-icons/fa';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Link } from 'react-router';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <FaHome />, 
      label: 'Dashboard',
    },
    {
      key: 'student',
      icon: <FaUserGraduate />, 
      label: 'Student',
      children: [
        {
          name:'Student List',
          path:'/admin/student/list'
        },{
          name:'Student Detail',
          path:'/admin/student/detail'
        },{
          name:'Add New Student',
          path:'/admin/student/add'
        }
       ]      
    },
    {
      key: 'teacher',
      icon: <FaChalkboardTeacher />, 
      label: 'Teacher',
      children: ['Teacher List', 'Add Teacher']
    },
    {
      key:'parent',
      icon: <FaUserGraduate />,
      label: 'Parent',
      children: [
        {
          name:'Parent List',
          path:'/admin/parent/list'
        },{
          name:'Student Detail',
          path:'/admin/student/detail'
        },{
          name:'Add New Student',
          path:'/admin/student/add'
        }
       ] 
    },
    {
      key: 'forms',
      icon: <BsFillFileEarmarkTextFill />, 
      label: 'Forms',
    }
  ];

  return (
    <div className={`h-screen bg-blue-600 text-white transition-all duration-300 ${isOpen ? 'w-54' : 'sm:w-20 w-10'} relative`}>
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-white p-2 text-blue-600 p-1 rounded-full shadow"
      >
        {isOpen ? <FaBars /> : <FaChevronRight />}
      </button>
      <div className="p-4 font-bold text-2xl flex items-center gap-2 hidden sm:flex">
        <span className="bg-white text-purple-700 p-2 rounded-full">A</span>
        {isOpen && <span>Akademi</span>}
      </div>
      <ul className="mt-4 space-y-1 ps-1">
        {menuItems.map((item) => (
          <li key={item.key}>
            <div
              className={`cursor-pointer hover:bg-gray-500 transition-all duration-300 relative py-2
                ${isOpen 
                  ? 'flex items-center gap-3 pl-4' 
                  : 'flex flex-col items-center justify-center'
                }`}
              onClick={() => item.children ? toggleDropdown(item.key) : null}
              data-tooltip-id={!isOpen ? `tooltip-${item.key}` : undefined}
              data-tooltip-content={!isOpen ? item.label : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </div>
            {!isOpen && <Tooltip id={`tooltip-${item.key}`} place="right" />} 

            {/* Dropdown */}
            {isOpen && item.children && openDropdown === item.key && (
              <ul className="ml-8 text-sm ">
                {item.children.map((child) => (
                  <li key={child} className="px-2 py-1 text-blue bg-white ">
                    <Link
                      to={child.path}
                      className="text-decoration-none hover:bg-white hover:text-blue-600  "
                    >{child.name}</Link>
                    
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
