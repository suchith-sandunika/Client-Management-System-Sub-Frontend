import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import Sidebar from "../../components/templetes/ESideBar";
import Navbar from "../../components/templetes/Navbar";
import Footer from "../../components/PagesFooter";
import AddAttendancePopup from "../../components/AddAttendancePopup";
import circlePlusIcon from "../../assets/plusIcon.png";
import searchIcon from "../../assets/image.png"
import 'react-toastify/dist/ReactToastify.css';
import "../../css/EmployeeAttendance.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeAttendance({ userData }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allAttendances, setAllAttendances] = useState([]);
    const [inputData, setInputData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [loggedUser, setLoggeduser] = useState([]);

    const user = 'esuchith@gmail.com';

    const formatDateToDMY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }; 

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    }; 

    const getLoggedUserData = async (input) => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/viewEmployees/${input}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }
            });
            const responseData = await response.json();
            if(!response.ok) {
                toast.error('Error Occured !');
            } else {
                console.log(responseData);
                setLoggeduser(responseData);
                console.log('success');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const viewAllAttendances = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/employees/ViewAllAttendances', {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }
            })
            const responseData = await response.json();
            if(!response.ok) {
                toast.error('Error Occured !');
            } else {
                console.log(response);
                setData(responseData);
                setAllAttendances(responseData); // Store all data
                console.log('success');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const searchAttendance = async (input) => {
        try {
            console.log(input);
            setInputData(input);
            const response = await fetch(`http://localhost:5000/api/employees/attendance/${input}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }
            })
            const responseData = await response.json();
            if(!response.ok) {
                toast.error('Error Occured !');
            } else {
                console.log(response);
                setData(responseData);
                console.log("data:", data);
                console.log(responseData);
                if(responseData.length > 0) {
                    console.log('success');
                } else {
                    console.log('empty');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle changes in the search input field
    const handleSearchChange = (e) => {
        const input = e.target.value;
        setSearchTerm(input); // Update the search term
        if (input) {
            searchAttendance(input);
        } else {
            setData(allAttendances);  // Clear data if input is empty
        }
    };

    const addAttendance = () => {
        setOpenPopup(true);
        console.log('Opening the Popup --');
    };

    const closePopup = () => {
        setOpenPopup(false);
    };

    useEffect(() => {
        viewAllAttendances(); // Fetch all attendances on mount ...
        // For testing i have added a dummy data , which stored in user variable ...
        getLoggedUserData(user); // Fetch logged user details ...
        // getLoggedUserData(userData);
        // In here all things fixed, when logged user details passed through a prop, 
        // then we can fetch user / employee data from database using that user 
        // details which stores in userDate ...
    }, []);

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Navbar />
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`flex-grow-1 d-flex`}>
                <div className={`ekr-sidebar-container ${sidebarVisible ? 'show-sidebar' : ''}`} style={{ flexShrink: 0 }}>
                    <Sidebar sidebarVisible={sidebarVisible} />
                </div>

                {/* Content Container */}
                <div className="ekr-content-container flex-grow-1 p-4">
                    <h5 className="mt-5">
                        Home / <span style={{ color: "#24757E" }}>Attendance</span>
                    </h5>
                    <div className="card mt-2 ekr-card-container-height border-0">
                        <div className="card-body">
                            <h4 className="ekr-employee-attendance-page-title text-center mt-1">Attendance</h4>
                            <div className="ekr-employee-button-container d-flex justify-content-between mt-1">
                                {/* Search Bar */}
                                <div className="ekr-employee-search-bar-container position-relative d-flex ms-2">
                                    <input
                                        type="text"
                                        className="form-control ekr-employee-search-bar"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn ekr-employee-search-bar-icon">
                                        <img alt="Search Icon" src={searchIcon} className="ekr-search-bar-icon"/>
                                        {/* <i className="bi bi-search"></i> */}
                                    </button>
                                </div>
                                {/* Add Attendance Button */}
                                <button className="ekr-add-attendance-button me-2" onClick={addAttendance}>
                                    Add Attendance
                                    <img
                                        alt="Add Icon"
                                        src={circlePlusIcon}
                                        className="ekr-add-attendance-button-icon"
                                    />
                                </button>
                            </div>
                            {/* Table Container */}
                            <div className="ekr-employee-attendance-table-container mt-1">
                                <table className="table table-bordered ekr-employee-attendance-table">
                                    <thead className="thead-light">
                                        <tr className="text-center">
                                            <th className="w-20 text-center">No</th>
                                            <th className="w-20 text-center">Employee Name</th>
                                            <th className="w-20 text-center">Date</th>
                                            <th className="w-20text-center">Email</th>
                                            <th className="w-20 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="employee-table-body">
                                        {data.length > 0 ? (
                                            data.map((element, index) => (
                                                <tr key={element.id} className="w-100">
                                                    <td className="text-center">{String(element.RowNumber).padStart(2, '0')}</td>
                                                    <td className="text-center">{element.name}</td>
                                                    <td className="text-center">{formatDateToDMY(new Date(element.date))}</td>
                                                    <td className="text-center">{element.email}</td>
                                                    <td className="text-center text-bold">{element.status}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className="w-100 border-0" colSpan="5">
                                                <td colSpan="5" className="text-center fw-bold">No matching records found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
            {/* Popup */}
            {openPopup && (
                <div className="ekr-popup-overlay">
                    <div className="ekr-popup-content" onClick={(e) => e.stopPropagation()}>
                        <AddAttendancePopup closePopup={closePopup} data={loggedUser} />
                    </div>
                </div>
            )}
            {/* Toast Notification */}
            <ToastContainer />
        </div>
    );
}

export default EmployeeAttendance;
