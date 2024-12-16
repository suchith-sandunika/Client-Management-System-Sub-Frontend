import React, { useState, useEffect } from 'react';
import Navbar from '../../components/templetes/Navbar';
import Footer from '../../components/PagesFooter';
import Sidebar from '../../components/templetes/SideBar';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import '../../css/AdminAttendance.css'; 
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 

const AdminAttendance = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]); // State to hold attendance data
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSortDateClick = () => {
    if (showDatePicker) {
      setSelectedDate(null); 
    }
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  // Fetch attendance data from the backend
  const fetchAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/admin/ViewAllAttendances');
      const data = await response.json();
      setAttendanceData(data);
      setFilteredData(data); // Initially show all data
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData(); // Fetch data on component mount
  }, []);

  // Format date into YYYY-MM-DD format (removes time)
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); 
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Only the date portion
  };

  // Enhanced Filter logic based on search term and selected date
  useEffect(() => {
    const filtered = attendanceData.filter((entry) => {
      const searchMatch =
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase());

      const dateMatch = selectedDate
        ? formatDate(entry.date) === formatDate(selectedDate)
        : true;

      return searchMatch && dateMatch;
    });
    setFilteredData(filtered);
  }, [attendanceData, searchTerm, selectedDate]);

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/admin/generatePDF', { method: 'GET' });
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Attendance_Report.pdf';
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  // Add this function to handle the reset button click
  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/admin/resetData', { method: 'GET' });
      const result = await response.json();
      if (response.ok) {
        // Reset the attendance data in the frontend after clearing the database
        setAttendanceData([]);
        setFilteredData([]);
        alert("Attendance data has been reset.");
      } else {
        alert("Error resetting attendance data.");
      }
    } catch (error) {
      console.error('Error resetting attendance data:', error);
      alert("Error resetting attendance data.");
    }
  };

  return (
    <div className="admin-attendance-container">
      <Navbar />
      <div className="d-flex">
        <Sidebar sidebarVisible={sidebarVisible} />
        <div className="main-content p-4">
          <div className="breadcrumb mb-3">
            <h5>
              Home /{' '}
              <span style={{ color: '#24757E' }}>Attendance</span>
            </h5>
          </div>

          <div className="">
            <div className="card-body">
              <h4 className="page-title text-center">Attendance</h4>

              <div className="controls-section d-flex justify-content-between align-items-center my-2">
                <div className="d-flex align-items-center position-relative">
                  <button
                    className="btn control-btn me-2 d-flex align-items-center justify-content-between mb-1"
                    onClick={handleSortDateClick}
                  >
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Sort Date'}
                    <i className="bi bi-calendar ms-2"></i>
                  </button>
                  {showDatePicker && (
                    <div className="date-picker-container position-absolute">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        className="form-control ms-2"
                        placeholderText="Select a date"
                        inline
                      />
                    </div>
                  )}
                </div>

                <div className="search-bar-container position-relative d-flex">
                  <input
                    type="text"
                    className="form-control search-bar me-2"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn search-bar-icon-btn">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div className="d-flex gap-2 mb-1">
                <button
                  className="btn reset-btn"
                  onClick={handleReset} // Updated to use handleReset
                >
                  Reset
                </button>
                <button className="btn download-btn" onClick={handleDownloadPDF}>
                  Download
                </button>
              </div>

              <div className="scrollable-table">
                <table className="attendance-table table table-bordered">
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
                    {filteredData.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{formatDate(entry.date)}</td> {/* Display formatted date */}
                        <td>{entry.email}</td>
                        <td>{entry.status}</td> {/* Always display "Attended" */}
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No matching records found
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
      <Footer />
    </div>
  );
};

export default AdminAttendance;
