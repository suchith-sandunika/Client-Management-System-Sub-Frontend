import React from "react";
import Sidebar from "../../components/templetes/ESideBar";
import Navbar from "../../components/templetes/Navbar";
import Footer from "../../components/PagesFooter";
import circlePlusIcon from '../../assets/circle-plus.256x256.png';
import '../../css/EmployeeAttendance.css';


function EmployeeAttendance () {
    return (
        <div className="admin-attendance-container">
            <Navbar />
            <div className="d-flex">
                <Sidebar/>
                <div className="main-content p-4">
                    <div className="page-name-container mb-2">
                        <h5>
                        Home /{' '}
                        <span style={{ color: '#24757E' }}>Attendance</span>
                        </h5>
                    </div>

                    <div className="card main-container">
                        <div className="card-body">
                            <h4 className="page-title text-center">Attendance</h4>

                            <div className="button-container">
                                {/* Search Bar with Icon */}
                                <div className="search-bar-container position-relative d-flex">
                                    <input type="text" className="form-control search-bar me-2" placeholder="Search"/>
                                    <button className="btn search-bar-icon-btn">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div> 
                                {/* Add Attendance Button */}
                                <button className="add-button">Add Attendance <img alt="Add icon" src={circlePlusIcon} className="button-icon" /></button>
                            </div>
                            
                            {/* Table */}
                            <div className="table-container">
                                <table className="employee-attendance-table table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>NO</th>
                                        <th>Employee Name</th>
                                        <th>Date</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} 

export default EmployeeAttendance;