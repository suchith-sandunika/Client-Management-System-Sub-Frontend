import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../components/templetes/ESideBar";
import Navbar from "../../components/templetes/Navbar";
import Footer from "../../components/PagesFooter";
import '../../css/UpdateEmployee.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEmployee = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility ...
    const [employeeID, setEmployeeID] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [workStartDate, setWorkStartDate] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { EmployeeID } = useParams();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Toggle password visibility
    }; 

    const formatDateToDMY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/employee/${EmployeeID}`);
                if (response.data) {
                    console.log(response.data);
                    setEmployeeID(response.data.EmployeeID);
                    setName(response.data.Name);
                    setDesignation(response.data.Designation);
                    setWorkStartDate(response.data.WorkStartDate);
                    setContactNumber(response.data.ContactNumber);
                    setAddress(response.data.Address);
                    setEmail(response.data.Email);
                    setUsername(response.data.Name);
                    setPassword(response.data.Password);
                } else {
                    setError("Employee not found.");
                }
            } catch (err) {
                console.error("Error fetching data:", err.message || err);
                setError("Failed to fetch employee details.");
            } finally {
                setLoading(false);
            }
        };

        if (EmployeeID) {
            fetchEmployeeDetails();
        }
    }, [EmployeeID]); 

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.put(`http://localhost:8081/update/${EmployeeID}`, employee);
    //         alert("Employee updated successfully!");
    //         navigate('/');
    //     } catch (err) {
    //         console.error("Update error:", err);
    //         alert("Error updating employee details.");
    //     }
    // };

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
                        Home / Employees / <span style={{ color: "#24757E" }}>Update Employee</span>
                    </h5>

                    <div className="card waw-card-container-height border-0">
                        <div className="card-body">
                            <h4 className="waw-employee-update-page-title text-center" style={{ color: "#24757E" }}>Employee Update</h4>
                            {/* form */}
                            <div className="waw-form-container">
                                <form>
                                    {/* EmployeeID Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="employeeID">EmployeeID</label>
                                        <input type="text" id="employeeID" className="form-control" placeholder="Enter ID" value={employeeID}/>
                                    </div>

                                    {/* Employee Name Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="employeeName">Employee Name</label>
                                        <input type="text" id="employeeName" className="form-control" placeholder="Enter Name" value={name}/>
                                    </div>

                                    {/* Designation Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="designation">Designation</label>
                                        <input type="text" id="designation" className="form-control" placeholder="Enter Designation" value={designation}/>
                                    </div>

                                    {/* Work Starting Date Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="workStartDate">Work Starting Date</label>
                                        <input
                                            type="date"
                                            id="workStartDate"
                                            className="form-control"
                                            placeholder="Enter Date"
                                            value={new Date(workStartDate).toISOString().split('T')[0]} // Convert to YYYY-MM-DD
                                        />
                                    </div>

                                    {/* Contact Number Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="contactNumber">Contact Number</label>
                                        <input type="text" id="contactNumber" className="form-control" placeholder="Enter Contact Number" value={contactNumber}/>
                                    </div>

                                    {/* Address Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" className="form-control" placeholder="Enter Address" value={address}/>
                                    </div>

                                    {/* Email Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="email" className="form-control" placeholder="Enter Email" value={email}/>
                                    </div>

                                    {/* User Name Field */}
                                    <div className="waw-form-row">
                                        <label htmlFor="userName">User Name</label>
                                        <input type="text" id="userName" className="form-control" placeholder="Enter User Name" value={username}/>
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
                                                value={password}
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
                                        <button type="submit" className="btn">Update</button>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../../components/templetes/Navbar';
// import Footer from '../../components/PagesFooter';
// import Sidebar from '../../components/templetes/SideBar';
// // import '../css/adminManageEmployee/update.css';
// // import'../../css/adminManageEmployee/update.css';
// import'../../css/admin/UpdateEmployee.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import usePasswordToggle from '../../components/Hooks/usePasswordToggle';

// function UpdateEmployee() {
//     const [sidebarVisible, setSidebarVisible] = useState(false);
//     const [PasswordInputType, ToggleIcon] = usePasswordToggle();
//     const { EmployeeID } = useParams();
//     const navigate = useNavigate();

//     const [employee, setEmployee] = useState({
//         Name: "",
//         Designation: "",
//         Workstartdate: "",
//         ContactNumber: "",
//         Address: "",
//         Email: "",
//         Username: "",
//         Password: ""
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const toggleSidebar = () => {
//         setSidebarVisible(!sidebarVisible);
//     };

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8081/employee/${EmployeeID}`);
//                 if (response.data) {
//                     setEmployee(response.data);
//                 } else {
//                     setError("Employee not found.");
//                 }
//             } catch (err) {
//                 console.error("Error fetching data:", err.message || err);
//                 setError("Failed to fetch employee details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (EmployeeID) {
//             fetchEmployeeDetails();
//         }
//     }, [EmployeeID]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`http://localhost:8081/update/${EmployeeID}`, employee);
//             alert("Employee updated successfully!");
//             navigate('/');
//         } catch (err) {
//             console.error("Update error:", err);
//             alert("Error updating employee details.");
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <div>
//             <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
//                 <Navbar />
//                 <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
//                 <div className={`flex-grow-1 d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
//                     <Sidebar sidebarVisible={sidebarVisible} />
//                     <br></br><br></br>
//                     <br></br>
//                     <br></br>
//                     <h6 > Home /  Employee /  Employee Update</h6>

//                     <h2>Employee Update</h2>
//                     <div className='waw-emp-Form'>
                        

//                         {loading && <p>Loading employee details...</p>}
//                         {error && <p className="error-message">{error}</p>}

//                         {!loading && !error && (
//                             <form onSubmit={handleSubmit}>
//                                 {[
//                                     {  name: "Name", type: "text" },
//                                     {  name: "Designation", type: "text" },
//                                     {  name: "Workstartdate", type: "date" },
//                                     {  name: "ContactNumber", type: "tel" },
//                                     {  name: "Address", type: "text" },
//                                     {  name: "Email", type: "email" },
//                                     { name: "Username", type: "text" },
//                                 ].map(({ label, name, type }) => (
//                                     <label key={name}>
//                                         <span>{label}</span>
//                                         <input
//                                             type={type}
//                                             name={name}
//                                             value={employee[name] || ""}
//                                             onChange={handleChange}
//                                         />
//                                     </label>
//                                 ))}
//                                 <label>
//                                     {/* <span>Password</span> */}
//                                     <div className="password-input-wrapper">
//                                         <input
//                                             type={PasswordInputType}
//                                             name="Password"
//                                             value={employee.Password || ""}
//                                             onChange={handleChange}
//                                         />
//                                         <span className="password-toggle-icon" onClick={ToggleIcon}>
//                                             {ToggleIcon}
//                                         </span>
//                                     </div>
//                                 </label>
//                                 <center>
//                                     <button type="submit" className="waw-save-button">Update</button>
//                                 </center>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <br></br>
//             <Footer />
//         </div>
//     );
// }

// export default UpdateEmployee;
