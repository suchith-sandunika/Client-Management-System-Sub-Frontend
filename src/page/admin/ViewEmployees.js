import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Navbar from '../../components/templetes/Navbar';
import Footer from '../../components/PagesFooter';
import Sidebar from '../../components/templetes/SideBar';
import searchIcon from "../../assets/image.png"
import '../../css/ViewEmployees.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewEmployees() {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [employee, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const formatDateToDMY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/employees")
      .then(res => {
        console.log(res.data);
        setEmployees(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (EmployeeID) => {
    Swal.fire({
      title: 'Confirmation About Delete',
      text: 'Are you sure you want to delete this Employee Details?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      customClass: {
        popup: 'smaller-swal-popup', // Add a custom class for styling
        title: 'smaller-swal-title',
        content: 'smaller-swal-content',
      },
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Perform the actiontry {
            try {
              await axios.delete(`http://localhost:5000/api/admin/employee/${EmployeeID}`);
              setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.EmployeeID !== EmployeeID));
              toast.success("Employee deleted successfully!");
            } catch (err) {
              console.error("Error deleting employee:", err);
              toast.error("Failed to delete employee!");
            }
        }
    });
  };

  // Function to handle the change in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const moveToAddEmployee = () => {
    navigate('/register-employee');
  };

  const moveToUpdate = (EmployeeID) => {
    navigate(`/update-employee/${EmployeeID}`);
  };

  // Filter the employees based on the search term
  // const filteredEmployees = employee.filter((data) => {
  //   return (
  //     data.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     data.EmployeeID.toString().includes(searchTerm) ||
  //     data.Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     data.ContactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     data.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     data.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     data.Username.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });
  const filteredEmployees = employee.filter((data) => {
    return (
      data.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.EmployeeID.toString().includes(searchTerm) ||
      data.Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (data.ContactNumber && data.ContactNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||  // Ensure it's a string before calling toLowerCase
      data.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  return (
          <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar />
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`flex-grow-1 d-flex`}>
                <div className={`waw-sidebar-container ${sidebarVisible ? 'show-sidebar' : ''}`} style={{ flexShrink: 0 }}>
                    <Sidebar sidebarVisible={sidebarVisible} />
                </div>

                {/* Content Container */}
                <div className="waw-content-container flex-grow-1 p-4">
                    <h5 className="mt-5">
                        Home / <span style={{ color: "#24757E" }}>Employee</span>
                    </h5>
                    <div className="card mt-2 waw-card-container-height border-0">
                        <div className="card-body">
                            <h4 className="waw-employee-view-page-title text-center">Manage Employee</h4>
                            <div className="waw-employee-button-container d-flex justify-content-between mt-1">
                                {/* Add Attendance Button */}
                                <button className="waw-add-employee-button me-2" onClick={moveToAddEmployee}>
                                    Add New Employee
                                </button>
                                {/* Search Bar */}
                                <div className="waw-employee-search-bar-container position-relative d-flex ms-2" onChange={handleSearchChange}>
                                    <input
                                        type="text"
                                        className="form-control waw-employee-search-bar"
                                        placeholder="Search"
                                    />
                                    <button className="btn waw-employee-search-bar-icon">
                                        <img alt="Search Icon" src={searchIcon} className="waw-search-bar-icon"/>
                                        {/* <i className="bi bi-search"></i> */}
                                    </button>
                                </div>
                            </div>
                            {/* Table Container */}
                            <div className="waw-employee-table-container mt-1" style={{ overflowX: 'auto', maxWidth: '100%' }}>
                                <table className="table table-bordered waw-employee-table">
                                    <thead className="thead-light">
                                        <tr className="text-center">
                                        <th className="w-5 text-center">EmployeeID</th>
                                        <th className="w-x text-center">Employee Name</th>
                                        <th className="w-5 text-center">Designation</th>
                                        <th className="w-x text-center">Work Starting Date</th>
                                        <th className="w-y text-center">Contact Number</th>
                                        <th className="w-5 text-center">Address</th>
                                        <th className="w-x text-center">Email</th>
                                        <th className="w-5 text-center">Username</th>
                                        {/* <th className="w-5 text-center">Password</th> */}
                                        <th className="w-1 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="employee-table-body">
                                      {filteredEmployees.length > 0 ? (
                                      filteredEmployees.map((data, i) => (
                                        <tr key={data.EmployeeID}>
                                          <td>{data.EmployeeID || "N/A"}</td>
                                          <td>{data.Name || "N/A"}</td>
                                          <td>{data.Designation || "N/A"}</td>
                                          <td>{formatDateToDMY(new Date(data.WorkStartDate)) || "N/A"}</td>
                                          <td>{data.ContactNumber || "N/A"}</td>
                                          <td>{data.Address || "N/A"}</td>
                                          <td>{data.Email || "N/A"}</td>
                                          <td>{data.Name || "N/A"}</td>
                                          {/* <td>{data.Password || "N/A"}</td> */}
                                          <td className="waw-action-buttons">
                                            {/* <a href={`/update/${data.EmployeeID}`}>
                                              <button className="waw-update-button">Update</button>
                                            </a> */}
                                            <button type="button" className="waw-update-button" onClick={() => moveToUpdate(data.EmployeeID)}>
                                              Update
                                            </button>
                                            <button type="button" className="waw-delete-button" onClick={() => handleDelete(data.EmployeeID)}>
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="10" className="text-center">
                                          No Employees Found
                                        </td>
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
        </div>    
  );
}

export default ViewEmployees;
