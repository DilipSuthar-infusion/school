import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
