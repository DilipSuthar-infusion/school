import React from 'react';
import { useAuth } from '../../Context/Authcontext';
// import ParentAttendanceDashboard from './ParentAttendanceDashboard'; 
// import FeeStatusCard from './FeeStatusCard';
// import MessagesCard from './MessagesCard';
// import EventsCard from './EventsCard';

const ParentDashboard = () => {
    const {userInfo} = useAuth()
  

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {userInfo.username}</h1>
          <p className="text-gray-500">Here's what's happening with your child(ren).</p>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* <FeeStatusCard />
          <MessagesCard />
          <EventsCard /> */}
        </div>

        {/* Attendance Dashboard */}
        {/* <ParentAttendanceDashboard /> */}

      </div>
    </div>
  );
};

export default ParentDashboard;
