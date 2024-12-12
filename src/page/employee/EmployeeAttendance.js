import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/templetes/ESideBar";
import Navbar from "../../components/templetes/Navbar";
import Footer from "../../components/PagesFooter";
import circlePlusIcon from "../../assets/circle-plus.256x256.png";
import "../../css/EmployeeAttendance.css";

function EmployeeAttendance() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allAttendances, setAllAttendances] = useState([]);
    const [inputData, setInputData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const formatDateToDMY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
    };

    const viewAllAttendances = async () => {
        try {
            const response = await fetch('http://localhost:8800/api/employees/ViewAllAttendances', {
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
            const response = await fetch(`http://localhost:8800/api/employees/attendance/${input}`, {
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
            searchAttendance(input); // Trigger search
        } else {
            setData(allAttendances);  // Clear data if input is empty
        }
    };

    const addAttendance = () => {
        setOpenPopup(true);
    };

    useEffect(() => {
        viewAllAttendances(); // Fetch all attendances on mount
    }, []);

    return (
        <div>
            <Navbar />
            <div className="d-flex">
                <div className="sidebar-container" style={{ flexShrink: 0 }}>
                    <Sidebar />
                </div>
                <div className="content-container flex-grow-1 p-4">
                    <h5 className="mt-5">
                        Home / <span style={{ color: "#24757E" }}>Attendance</span>
                    </h5>
                    <div className="card mt-3 card-container-height">
                        <div className="card-body">
                            <h4 className="employee-attendance-page-title text-center mt-3">
                                Attendance
                            </h4>
                            <div className="employee-button-container d-flex justify-content-between mt-4">
                                <div className="employee-search-bar-container position-relative d-flex ms-2">
                                    <input
                                        type="text"
                                        className="form-control employee-search-bar"
                                        placeholder="Enter the text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn employee-search-bar-icon">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                                <button className="add-attendance-button me-2" onClick={addAttendance}>
                                    Add Attendance
                                    <img
                                        alt="Add icon"
                                        src={circlePlusIcon}
                                        className="add-attendance-button-icon"
                                    />
                                </button>

                            </div>
                            {/*table container*/}
                            <div className="employee-attendance-table-container mt-4">
                                <table className="table table-bordered employee-attendance-table">
                                    <thead className="thead-light">
                                        <tr className='text-center'>
                                            <th>NO</th>
                                            <th>Employee Name</th>
                                            <th>Date</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id='employee-table-body'>
                                        {data.length > 0 ? (
                                            data.map((element, index) => (
                                                <tr key={element.id} className="w-100">
                                                    <td className="w-15 text-center">{element.RowNumber}</td>
                                                    <td className="w-25 text-center">{element.name}</td>
                                                    <td className="w-20 text-center">{formatDateToDMY(new Date(element.date))}</td>
                                                    <td className="w-25 text-center">{element.email}</td>
                                                    <td className="w-15 text-center" style={{ color: element.status === "Attended" ? "green" : "red" }}>{element.status}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className="w-100">
                                                <td colSpan="5" className="text-center">No matching records found</td>
                                            </tr>
                                        )}
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
