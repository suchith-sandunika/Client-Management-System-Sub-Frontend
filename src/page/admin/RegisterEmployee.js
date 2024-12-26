import React, { useState } from 'react';
import Sidebar from "../../components/templetes/ESideBar";
import Navbar from "../../components/templetes/Navbar";
import Footer from "../../components/PagesFooter";
import '../../css/RegisterEmployee.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEmployee = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Toggle password visibility
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Navbar />
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`flex-grow-1 d-flex`}>
                <div className={`waw-sidebar-container ${sidebarVisible ? 'show-sidebar' : ''}`} style={{ flexShrink: 0 }}>
                    <Sidebar sidebarVisible={sidebarVisible} />
                </div>

                {/* Content Container */}
                <div className="waw-content-container flex-grow-1 p-4" style={{
                    height: "100vh",           // Full viewport height
                    overflowY: "auto",         // Enable scrolling for the entire DOM
                    display: "flex",           // Flex layout for content flow
                    flexDirection: "column"    // Stack children vertically
                }}>
                    <h5 className="mt-5">
                        Home / Employees / <span style={{ color: "#24757E" }}>Register Employee</span>
                    </h5>

                    <div className="card waw-card-container-height border-0">
                        <div className="card-body">
                            <h4 className="waw-employee-update-page-title text-center" style={{ color: "#24757E" }}>Register Employee</h4>
                            {/* form */}
                            <div className="waw-form-container">
                                <form>
                                    {/* EmployeeID Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="employeeID">EmployeeID</label>
                                        <input type="text" id="employeeID" className="form-control" placeholder="Enter ID"/>
                                    </div>

                                    {/* Employee Name Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="employeeName">Employee Name</label>
                                        <input type="text" id="employeeName" className="form-control" placeholder="Enter Name"/>
                                    </div>

                                    {/* Designation Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="designation">Designation</label>
                                        <input type="text" id="designation" className="form-control" placeholder="Enter Designation"/>
                                    </div>

                                    {/* Work Starting Date Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="workStartDate">Work Starting Date</label>
                                        <input type="date" id="workStartDate" className="form-control" placeholder="Enter Date"/>
                                    </div>

                                    {/* Contact Number Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="contactNumber">Contact Number</label>
                                        <input type="text" id="contactNumber" className="form-control" placeholder="Enter Contact Number"/>
                                    </div>

                                    {/* Address Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" className="form-control" placeholder="Enter Address"/>
                                    </div>

                                    {/* Email Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="email" className="form-control" placeholder="Enter Email"/>
                                    </div>

                                    {/* User Name Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="userName">User Name</label>
                                        <input type="text" id="userName" className="form-control" placeholder="Enter User Name"/>
                                    </div>

                                    {/* Password Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="password">Password</label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                id="password"
                                                className="form-control"
                                                placeholder="Enter password"
                                            />
                                            <span
                                                className="password-toggle-btn"
                                                onClick={togglePasswordVisibility}
                                            >
                                                <i className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="waw-form-row">
                                        <button type="submit" className="btn">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
  );
}

export default UpdateEmployee;

// //import React from 'react';
// import React, { useState } from 'react';
// import axios from 'axios';
// import Navbar from '../../components/templetes/Navbar';
// import Footer from '../../components/PagesFooter';
// import Sidebar from '../../components/templetes/SideBar';
// // import '../css/adminManageEmployee/employee.css';
// import '../../css/admin/RegisterEmployee.css';
// import {useNavigate} from 'react-router-dom';
// //import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import usePasswordToggle from '../../components/Hooks/usePasswordToggle';

// function RegisterEmployee() {
//     const [sidebarVisible, setSidebarVisible] = useState(false);
//     const [PasswordInputType , ToggleIcon]= usePasswordToggle();

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };
  
//     //<div>Employee</div>

// //const [employeeId, setID] = useState("");
// const [Name, setName] = useState("");
// const [Designation, setDesignation] = useState("");
// const [Workstartdate,setWorkedStartdate] = useState("");
// const [ContactNumber, setContactNumber] = useState("");
// const [Address, setAddress] = useState("");
// const [Email, setEmail] = useState("");
// const [Username, setUsername] = useState("");
// const [Password, setPassword] = useState("");

// const navigate = useNavigate();





// function handleSubmit(event){
//   event.preventDefault();
//   axios.post("http://localhost:8081/employee", {
//     Name, Designation, Workstartdate, ContactNumber, Address, Email, Username, Password
//   })
//   .then(res => {
//     console.log(res);
//     navigate('/');
//   }).catch(err => {
//     console.error("Error posting data:", err.response?.data || err.message);
//   });
  
//   //  axios.post("http://localhost:8081/employee" , {Name,Designation,Workstartdate,ContactNumber,Address,Email,Username,Password})
//   // // axios.post("http://localhost:8081/employee", {
//   // //   Name, Designation, Workstartdate, ContactNumber, Address, Email, Username, Password
//   // // })
  
//   //  .then(res => {
//   //   console.log(res);
//   //   navigate('/');
//   //   }).catch(err => {
//   //   console.error("Error posting data:", err.response?.data || err.message);
//   //  });
  
//   }

//   return (
    
// <div>
//     <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
//       <Navbar /> 
//       <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
//       <div className={`flex-grow-1 d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
//         <Sidebar sidebarVisible={sidebarVisible} />
    
    
// <br></br>
// <br></br>

// <br></br>
// <br></br>

// <h6> Home / Employee /  Register Employee</h6>

// <h2>Register Employee</h2>

//     <div className='waw-emp-Form'>
//     <form onSubmit={handleSubmit}>
//        {/* <label>
//         <input
//           type="integer" 
//           value={employeeId}
//           placeholder='Employee ID'
//           onChange={(e) => setID(e.target.value)}
//         />
//       </label> 
//       <br></br> */}
//       <label>
//         <input
//           type="text" 
//           value={Name}
//           placeholder='Employee Name'
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type="text" 
//           value={Designation}
//           placeholder='Designation'
//           onChange={(e) => setDesignation(e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type="date" 
//           value={Workstartdate}
//           placeholder='Worked Start date  '
//           onChange={(e) => setWorkedStartdate (e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type="number" 
//           value={ContactNumber}
//           placeholder='Contact Number'
//           onChange={(e) => setContactNumber(e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type="text" 
//           value={Address}
//           placeholder='Address'
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type="Email" 
//           value={Email}
//           placeholder='Email'
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type="text" 
//           value={Username}
//           placeholder='Username'
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </label><br></br>
//       <label>
//         <input
//           type={PasswordInputType}
//           value={Password}
//           placeholder='Password'
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <span className="waw-password-toggle-icon">{ToggleIcon}</span>
        
//       </label><br></br>
//       <center>
//       <button type="submit" className="waw-save-button">
//       Save
//     </button>
//     </center>
//     </form>
//     </div>

    
//     </div>
//     <br></br>
//     </div>
//     <Footer/>
//     </div>
//   )
    
  
// }

// export default RegisterEmployee;