// import React, { useEffect, useState } from "react";
// import useAttendanceApi from "../../hooks/useAttendenceApi";
// import useClassApi from "../../hooks/useClassApi";
// import useUserApi from "../../hooks/useUserApi";
// import { useAuth } from "../../Context/Authcontext";
// import { 
//   Calendar, 
//   CheckCircle, 
//   XCircle, 
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
//   Users,
//   Heart,
//   AlertTriangle,
//   Star
// } from "lucide-react";

// const ParentAttendanceDashboard = () => {
//   const { getChildrenAttendance } = useAttendanceApi();
//   const { Classes } = useClassApi();
//   const { users } = useUserApi();
//   const { user } = useAuth();

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedChildId, setSelectedChildId] = useState("");
//   const [childrenData, setChildrenData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getMonthData = () => {
//     const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
//     const monthStart = new Date(selectedYear, selectedMonth, 1);
//     const firstDayOfWeek = monthStart.getDay();
    
//     return { daysInMonth, firstDayOfWeek };
//   };

//   const fetchChildrenAttendance = async () => {
//     setLoading(true);
//     try {
//       // Replace with actual API call
//       // const data = await getChildrenAttendance(user.id, selectedMonth, selectedYear);
      
//       // Get children linked to this parent
//       const children = users.filter(u => u.role === 'student' && u.parentId === user.id);
      
//       const { daysInMonth } = getMonthData();
//       const mockChildrenData = children.map(child => {
//         const childData = {
//           studentId: child.id,
//           studentName: child.username || child.name,
//           className: Classes.find(c => c.id === child.classId)?.classname || 'N/A',
//           rollNumber: child.rollNumber || 'N/A',
//           days: {}
//         };

//         // Generate mock attendance for each day
//         for (let day = 1; day <= daysInMonth; day++) {
//           const date = new Date(selectedYear, selectedMonth, day);
//           const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          
//           if (!isWeekend && date <= new Date()) {
//             // Different attendance patterns for different children
//             const attendanceRate = child.id.endsWith('1') ? 0.9 : child.id.endsWith('2') ? 0.8 : 0.85;
//             childData.days[day] = Math.random() > (1 - attendanceRate) ? 'present' : 'absent';
//           }
//         }

//         return childData;
//       });

//       setChildrenData(mockChildrenData);
      
//       // Auto-select first child if none selected
//       if (!selectedChildId && mockChildrenData.length > 0) {
//         setSelectedChildId(mockChildrenData[0].studentId);
//       }
//     } catch (error) {
//       console.error('Error fetching children attendance:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchChildrenAttendance();
//     }
//   }, [selectedMonth, selectedYear, user]);

//   const calculateStats = (childData) => {
//     if (!childData) return { present: 0, absent: 0, total: 0, percentage: 0 };
    
//     const days = Object.values(childData.days);
//     const present = days.filter(d => d === 'present').length;
//     const absent = days.filter(d => d === 'absent').length;
//     const total = present + absent;
//     const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
//     return { present, absent, total, percentage };
//   };

//   const navigateMonth = (direction) => {
//     if (direction === 'prev') {
//       if (selectedMonth === 0) {
//         setSelectedMonth(11);
//         setSelectedYear(selectedYear - 1);
//       } else {
//         setSelectedMonth(selectedMonth - 1);
//       }
//     } else {
//       if (selectedMonth === 11) {
//         setSelectedMonth(0);
//         setSelectedYear(selectedYear + 1);
//       } else {
//         setSelectedMonth(selectedMonth + 1);
//       }
//     }
//   };

//   const getAttendanceStatus = (percentage) => {
//     if (percentage >= 90) return { status: 'Excellent', color: 'text-green-600', bg: 'bg-green-100', icon: Star };
//     if (percentage >= 80) return { status: 'Good', color: 'text-blue-600', bg: 'bg-blue-100', icon: CheckCircle };
//     if (percentage >= 70) return { status: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: TrendingUp };
//     return { status: 'Needs Attention', color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
//   };

//   const selectedChild = childrenData.find(child => child.studentId === selectedChildId);
//   const { daysInMonth, firstDayOfWeek } = getMonthData();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 p-3 sm:p-4 lg:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
//           <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 p-6">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <div className="flex items-center text-white">
//                 <div className="bg-white/20 p-3 rounded-xl mr-4">
//                   <Heart className="w-8 h-8" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold">My Child's Attendance</h1>
//                   <p className="text-pink-100 mt-1">Monitor your child's school attendance</p>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 {/* Child Selection */}
//                 {childrenData.length > 1 && (
//                   <select
//                     value={selectedChildId}
//                     onChange={(e) => setSelectedChildId(e.target.value)}
//                     className="bg-white/90 backdrop-blur text-gray-800 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
//                   >
//                     {childrenData.map((child) => (
//                       <option key={child.studentId} value={child.studentId}>
//                         {child.studentName}
//                       </option>
//                     ))}
//                   </select>
//                 )}

//                 {/* Month Navigation */}
//                 <div className="flex items-center bg-white/10 rounded-xl p-1">
//                   <button
//                     onClick={() => navigateMonth('prev')}
//                     className="p-2 rounded-lg hover:bg-white/20 transition-colors"
//                   >
//                     <ChevronLeft className="w-5 h-5 text-white" />
//                   </button>
//                   <span className="px-4 py-2 text-white font-medium min-w-[150px] text-center">
//                     {months[selectedMonth]} {selectedYear}
//                   </span>
//                   <button
//                     onClick={() => navigateMonth('next')}
//                     className="p-2 rounded-lg hover:bg-white/20 transition-colors"
//                   >
//                     <ChevronRight className="w-5 h-5 text-white" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading attendance data...</p>
//           </div>
//         ) : (
//           <>
//             {/* Children Overview Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//               {childrenData.map((child) => {
//                 const stats = calculateStats(child);
//                 const status = getAttendanceStatus(stats.percentage);
//                 const StatusIcon = status.icon;
                
//                 return (
//                   <div 
//                     key={child.studentId}
//                     className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 ${
//                       selectedChildId === child.studentId ? 'ring-4 ring-pink-300 shadow-xl' : ''
//                     }`}
//                     onClick={() => setSelectedChildId(child.studentId)}
//                   >
//                     <div className="flex items-center mb-4">
//                       <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
//                         {child.studentName.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-900">{child.studentName}</h3>
//                         <p className="text-gray-600 text-sm">{child.className}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-3">
//                       <div className={`${status.bg} ${status.color} px-3 py-2 rounded-lg flex items-center justify-between`}>
//                         <span className="font-medium">{status.status}</span>
//                         <StatusIcon className="w-5 h-5" />
//                       </div>
                      
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Attendance:</span>
//                         <span className="font-bold text-gray-900">{stats.percentage}%</span>
//                       </div>
                      
//                       <div className="flex justify-between text-sm">
//                         <span className="text-green-600">Present: {stats.present}</span>
//                         <span className="text-red-600">Absent: {stats.absent}</span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Detailed View for Selected Child */}
//             {selectedChild && (
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                 {/* Child Header */}
//                 <div