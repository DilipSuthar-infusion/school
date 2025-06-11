import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Home, 
  GraduationCap, 
  Users, 
  UserCheck, 
  BookOpen, 
  Grid3X3, 
  Menu, 
  X, 
  ChevronRight,
  User,
  Plus,
  List,
  FileText,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  CreditCard,
  Bell,
  FileSpreadsheet,
  Clock,
  Award,
  BookmarkCheck,
  MapPin,
  LogOut
} from 'lucide-react';
import logo from '../assets/Images/logo.png'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Complete menuItems array
  const menuItems = [
    {
      key: 'dashboard',
      icon: <Home className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/admin',
      badge: null
    },
    {
      key: 'analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Analytics',
      path: '/admin/analytics',
      badge: null
    },
    {
      key: 'student',
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Students',
      badge: '24',
      children: [
        { 
          key: 'student-list',
          name: 'Student List', 
          path: '/admin/student/list',
          icon: <List className="w-4 h-4" />
        },
        { 
          key: 'student-detail',
          name: 'Student Details', 
          path: '/admin/student/detail',
          icon: <FileText className="w-4 h-4" />
        },
        { 
          key: 'add-student',
          name: 'Add New Student', 
          path: '/admin/student/add',
          icon: <Plus className="w-4 h-4" />
        },
      ],
    },
    {
      key: 'teacher',
      icon: <UserCheck className="w-5 h-5" />,
      label: 'Teachers',
      badge: '12',
      children: [
        { 
          key: 'teacher-list',
          name: 'Teacher List', 
          path: '/admin/teacher/list',
          icon: <List className="w-4 h-4" />
        },
        { 
          key: 'add-teacher',
          name: 'Add Teacher', 
          path: '/admin/teacher/add',
          icon: <Plus className="w-4 h-4" />
        },
      ],
    },
    {
      key: 'parent',
      icon: <Users className="w-5 h-5" />,
      label: 'Parents',
      badge: '18',
      children: [
        { 
          key: 'parent-list',
          name: 'Parent List', 
          path: '/admin/parent/list',
          icon: <List className="w-4 h-4" />
        },
        { 
          key: 'parent-detail',
          name: 'Parent Details', 
          path: '/admin/parent/detail',
          icon: <FileText className="w-4 h-4" />
        },
        { 
          key: 'add-parent',
          name: 'Add New Parent', 
          path: '/admin/parent/add',
          icon: <Plus className="w-4 h-4" />
        },
      ],
    },
    {
      key: 'Events',
      icon: <Grid3X3 className="w-5 h-5" />,
      label: 'Events',
      badge: '8',
      children: [
        { 
          key: 'manage-events',
          name: 'Manage Events',
          path: '/admin/events',
          icon: <Grid3X3 className="w-4 h-4" />
        }
      ],
    },
    {
      key: 'classes',
      icon: <Grid3X3 className="w-5 h-5" />,
      label: 'Classes',
      badge: '8',
      children: [
        { 
          key: 'manage-classes',
          name: 'Manage Classes', 
          path: '/admin/classes',
          icon: <Grid3X3 className="w-4 h-4" />
        }
      ],
    },
    {
      key: 'subjects',
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Subjects',
      badge: '15',
      children: [
        { 
          key: 'manage-subjects',
          name: 'Manage Subjects', 
          path: '/admin/subject/list',
          icon: <BookOpen className="w-4 h-4" />
        },
      ],
    },
    {
      key: 'attendance',
      icon: <BookmarkCheck className="w-5 h-5" />,
      label: 'Attendance',
      path: '/admin/attendance',
      badge: 'New'
    },
    {
      key: 'timetable',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Time Table',
      path: '/admin/timetable',
      badge: null
    },
    {
      key: 'exams',
      icon: <Award className="w-5 h-5" />,
      label: 'Exams & Grades',
      path: '/admin/exams',
      badge: null
    },
    {
      key: 'library',
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Library',
      path: '/admin/library',
      badge: null
    },
    {
      key: 'transport',
      icon: <MapPin className="w-5 h-5" />,
      label: 'Transport',
      path: '/admin/transport',
      badge: null
    },
    {
      key: 'fees',
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Fee Management',
      path: '/admin/fees',
      badge: '3'
    },
    {
      key: 'reports',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      label: 'Reports',
      path: '/admin/reports',
      badge: null
    },
  ];

  // Set active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check for direct matches first
    const directMatch = menuItems.find(item => item.path === currentPath);
    if (directMatch) {
      setActiveItem(directMatch.key);
      return;
    }

    // Check for child matches
    for (const item of menuItems) {
      if (item.children) {
        const childMatch = item.children.find(child => child.path === currentPath);
        if (childMatch) {
          setActiveItem(childMatch.key);
          setOpenDropdown(item.key); // Auto-open parent dropdown
          return;
        }
      }
    }
  }, [location.pathname]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleItemClick = (key, hasChildren = false, path = null) => {
    if (hasChildren) {
      toggleDropdown(key);
    } else {
      setActiveItem(key);
      if (isMobile) {
        setIsOpen(false);
      }
      if (path) {
        navigate(path);
      }
    }
  };

  const handleChildClick = (childKey, path) => {
    setActiveItem(childKey);
    if (isMobile) {
      setIsOpen(false);
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-slate-700 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Backdrop for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile ? 'fixed' : 'relative'
        } inset-y-0 left-0 z-40 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen 
            ? 'w-72 translate-x-0' 
            : isMobile 
              ? 'w-72 -translate-x-full' 
              : 'w-16'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-around px-3 py-4 border-b border-slate-700/50">
          <div className={`transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          } ${!isMobile && !isOpen ? 'lg:opacity-0' : ''}`}>
            {isOpen && (
              <div className="flex items-center justify-center gap-3">
                  <img className="w-50" src={logo} alt="logo" />
              </div>
            )}
          </div>

          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className=" rounded-xl hover:bg-slate-700/50 transition-all duration-200 group mx-auto"
              aria-label="Toggle sidebar"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-slate-300 group-hover:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300 group-hover:text-white" />
              )}
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <ul className="space-y-1 ps-0">
            {menuItems.map((item) => (
              <li key={item.key}>
                <div
                  className={`group relative flex items-center cursor-pointer select-none rounded-xl transition-all duration-200 ${
                    activeItem === item.key && !item.children
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-[1.02]'
                      : openDropdown === item.key
                      ? 'bg-slate-700/50'
                      : 'hover:bg-slate-700/30 hover:scale-[1.01]'
                  } ${isOpen ? 'px-3 py-3' : 'px-3 py-3 justify-center'}`}
                  onClick={() => handleItemClick(item.key, !!item.children, item.path)}
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 transition-colors ${
                    activeItem === item.key && !item.children
                      ? 'text-white'
                      : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {item.icon}
                  </div>

                  {/* Label and Badge */}
                  {isOpen && (
                    <>
                      <span className={`ml-3 flex-1 font-medium transition-colors ${
                        activeItem === item.key && !item.children
                          ? 'text-white'
                          : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>

                      {/* Badge */}
                      {item.badge && (
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                          item.badge === 'New' 
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}

                      {/* Dropdown Arrow */}
                      {item.children && (
                        <ChevronRight
                          className={`w-4 h-4 ml-2 text-slate-400 transition-transform duration-200 ${
                            openDropdown === item.key ? 'rotate-90' : ''
                          }`}
                        />
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed sidebar */}
                  {!isOpen && !isMobile && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-600">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500/30 rounded">
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
                    </div>
                  )}
                </div>

                {/* Dropdown children */}
                {isOpen && item.children && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdown === item.key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="mt-1 space-y-1 ml-4">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <div
                            className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 group ${
                              activeItem === child.key
                                ? 'bg-slate-600/50 text-white'
                                : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                            }`}
                            onClick={() => handleChildClick(child.key, child.path)}
                          >
                            <div className={`transition-colors ${
                              activeItem === child.key
                                ? 'text-blue-400'
                                : 'text-slate-400 group-hover:text-slate-300'
                            }`}>
                              {child.icon}
                            </div>
                            <span className="ml-3 text-sm font-medium">
                              {child.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-4">
          {isOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    admin@school.com
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;