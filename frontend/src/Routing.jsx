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
import StudentDetail from './pages/admin/StudentDetail'
import ManageTeacher from './pages/admin/ManageTeacher'
import ManageSubjects from './pages/admin/ManageSubjects'
import ManageClassRoutine from './pages/admin/ManageClassRoutine'
import PageNotFound from './PageNotFound'
import ManageExam from './pages/admin/ManageExam'
import ManageExamResult from './pages/admin/ManageExamResult'
import ManageFeeStructure from './pages/admin/ManageFeeStructure'

import StudentDashboard from './pages/Student/StudentDashboard'
import ManageAttendence from './pages/admin/ManageAttendence'
import ManageStudentAttendence from './pages/Teacher/ManageStudentAttendence'
import AttendanceDashboard from './pages/Teacher/AttendanceDashboard'
import Layout from './Website/Pages/Layout'
import Topbar from './Website/Components/Topbar'

const Routing = () => {
  return (
    <>
        <Routes>
      {/* Auth Route */}
      <Route path='/login' element={<Login />} />

      {/* Admin Routes */}
      <Route path='/admin' element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path='student/list' element={<StudentList />} />
        <Route path='student/list/:studentId' element={<StudentDetail />} />
        <Route path='parent/list' element={<ManageParents />} />
        <Route path='classes' element={<ManageClasses />} />
        <Route path='events' element={<ManageEvents />} />
        <Route path='teacher/list' element={<ManageTeacher />} />
        <Route path='subject/list' element={<ManageSubjects />} />
        <Route path='classRoutine' element={<ManageClassRoutine />} />
        <Route path='exam/list'  element={<ManageExam/>}/>
        <Route path='exam/results' element={<ManageExamResult />} />
        <Route path='fees/struct' element={<ManageFeeStructure />}/>
        <Route path='attendance' element={<ManageAttendence />} />
      </Route>

    
      <Route path='/teacher' element={<Home />}>
        <Route index element={<TeacherDashboard />} />
        <Route path='attendence' element={<ManageStudentAttendence />}/>
        <Route path='dashboard' element={<AttendanceDashboard />}/>
        
      </Route>
      <Route path='/student/dashboard' element={<Home />}>
        <Route index element={<StudentDashboard />} />
      </Route>


      <Route path='/' element={<Layout />}>
          <Route element={<Topbar/>}>
          
          
          </Route>
      </Route>
   
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default Routing