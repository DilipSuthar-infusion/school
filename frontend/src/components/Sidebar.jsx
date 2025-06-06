import React, { useState } from 'react';
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import logo from '../assets/Images/logo.png';
import { FiGrid } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router';
import 'react-tooltip/dist/react-tooltip.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };
  
  const menuItems = [
   
    {
      key: 'student',
      icon: <FaUserGraduate />,
      label: 'Student',
      children: [
        { name: 'Student List', path: '/admin/student/list' },
        { name: 'Student Detail', path: '/admin/student/detail' },
        { name: 'Add New Student', path: '/admin/student/add' },
      ],
    },
    {
      key: 'teacher',
      icon: <FaChalkboardTeacher />,
      label: 'Teacher',
      children: [
        { name: 'Teacher List', path: '/admin/teacher/list' },
        { name: 'Add Teacher', path: '/admin/teacher/add' },
      ],
    },
    {
      key: 'parent',
      icon: <FaUserGraduate />,
      label: 'Parent',
      children: [
        { name: 'Parent List', path: '/admin/parent/list' },
        { name: 'Student Detail', path: '/admin/student/detail' },
        { name: 'Add New Student', path: '/admin/student/add' },
      ],
    },
   
    {
      key: 'classes',
      icon: <FiGrid />,
      label: 'Classes',
      children: [{ name: 'Manage Classes', path: '/admin/classes' }],
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-blue-600 text-white flex flex-col transition-width duration-300 ${
          isOpen ? 'sm:w-64 w-55' : 'sm:w-16'
        } relative`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-blue-600">
          <div className='w-50 mx-auto'>
          {isOpen && <h2 className="text-xl font-bold"><img src={logo} alt="logo" className="w-full rounded-md" /></h2>}
          </div>
          

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-blue-600 transition"
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <FaTimes className="text-white text-lg" />
            ) : (
              <FaBars className="text-white text-lg" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className='ps-0'>
            {menuItems.map((item) => (
              <li key={item.key}>
                <div
                  className={`flex items-center cursor-pointer select-none px-4 py-3 hover:bg-blue-600 transition ${
                    openDropdown === item.key ? 'bg-blue-600' : ''
                  }`}
                  onClick={() =>
                    item.children ? toggleDropdown(item.key) : null
                  }
                  data-tooltip-id={!isOpen ? `tooltip-${item.key}` : undefined}
                  data-tooltip-content={!isOpen ? item.label : undefined}
                >
                  <span className="text-lg">{item.icon}</span>

                  {isOpen && (
                    <span className="ml-3 flex-1">{item.label}</span>
                  )}

                  {/* Show dropdown arrow if has children and sidebar open */}
                  {isOpen && item.children && (
                    <svg
                      className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${
                        openDropdown === item.key ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  )}
                </div>

                {/* Tooltip for collapsed sidebar */}
                {!isOpen && <Tooltip id={`tooltip-${item.key}`} place="right" />}

                {/* Direct link without children */}
                {isOpen && !item.children && item.path && (
                  <ul className="pl-12 bg-blue-800">
                    <li>
                      <Link
                        to={item.path}
                        className="block py-2 px-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded"
                      >
                        {item.label}
                      </Link>
                    </li>
                  </ul>
                )}

                {/* Dropdown children */}
                {isOpen && item.children && openDropdown === item.key && (
                  <ul
                    className="bg-white overflow-hidden transition-[max-height] duration-500 ease-in-out"
                    style={{ maxHeight: openDropdown === item.key ? '500px' : '0' }}
                  >
                    {item.children.map((child) => (
                      <li key={child.name} className="">
                        <Link
                            to={child.path}
                            className="block md:text-base  text-sm -ml-8 py-2 px-5 text-blue-100 hover:bg-gray-100  hover:border-b-2 border-transparent hover:border-orange-300 
                            hover:text-white no-underline text-decoration-none transition-all duration-200"
                          >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
</div>
     
  );
};

export default Sidebar;
