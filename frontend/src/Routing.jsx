import React from 'react'
import { Route, Routes } from 'react-router'
// import Home from './components/Home'
// import Navbar from './components/Navbars'

import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Home from './components/Home'
import StudentList from './pages/admin/StudentList'
import TeacherDashboard from './pages/Teacher/TeacherDashboard'
import ManageParents from './pages/admin/ManageParents'
import ManageClasses from './pages/admin/ManageClasses'
import ManageEvents from './pages/admin/ManageEvents'

const Routing = () => {
  return (
    <>
        <Routes>
      {/* Auth Route */}
      <Route path='/' element={<Login />} />

      {/* Admin Routes */}
      <Route path='/admin' element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path='student/list' element={<StudentList />} />
        <Route path='parent/list' element={<ManageParents />} />
        <Route path='classes' element={<ManageClasses />} />
        <Route path='events' element={<ManageEvents />} />
        
      </Route>

      {/* Teacher Routes */}
      <Route path='/teacher' element={<Home />}>
        <Route index element={<TeacherDashboard />} />
        
      </Route>

      {/* Catch-all */}
      <Route path='*' element={<h1>404 Page Not Found</h1>} />
    </Routes>
    </>
  )
}

export default Routing