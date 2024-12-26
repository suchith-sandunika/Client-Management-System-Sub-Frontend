import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './page/mainPage';
import SigninPage from './page/signinPage';
import AdminDashboard from './page/admin/adminDashboardPage';
import EmployeeDashboard from './page/employee/employeeDashboard';
import AdminAttendance from './page/admin/Adminattendence';
import EmployeeAttendance from './page/employee/EmployeeAttendance';
import EmployeeMailBox from './page/employee/EmployeeMailBox';
import ViewEmployees from './page/admin/ViewEmployees';
import RegisterEmployee from './page/admin/RegisterEmployee';
import UpdateEmployee from './page/admin/UpdateEmployee';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={< MainPage/>} />
        <Route path="/login" element={<SigninPage/>} />

        {/* Admin-Side Routes */}
        <Route path="/admin-Dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-attendance" element={<AdminAttendance />} />
        <Route path="/view-employees" element={<ViewEmployees/>} />
        <Route path="/register-employee" element={<RegisterEmployee/>} />
        <Route path="/update-employee/:EmployeeID" element={<UpdateEmployee/>} />

        {/* Employee-Side Routes */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
        <Route path='/employee-attendance' element={<EmployeeAttendance />} />
        <Route path="/employee-mailbox" element={<EmployeeMailBox />} />

      </Routes>
    </Router>
  );
}

export default App;
