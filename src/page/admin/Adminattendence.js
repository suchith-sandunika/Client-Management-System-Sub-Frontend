import React, { useState } from 'react';
import Navbar from '../../components/templetes/Navbar';
import Footer from '../../components/PagesFooter';
import Sidebar from '../../components/templetes/SideBar';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import '../../css/AdminAttendance.css'; // CSS for styling
import jsPDF from 'jspdf'; // Import jsPDF library
import 'jspdf-autotable'; // Import jsPDF autotable plugin

const AdminAttendance = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSortDateClick = () => {
    if (showDatePicker) {
      setSelectedDate(null); // Reset the selected date when re-clicking the button
    }
    setShowDatePicker(!showDatePicker); // Toggle date picker visibility
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
    setShowDatePicker(false); // Hide date picker after selection
  };

  // Sample data for demonstration
  const attendanceData = [
    { id: 1, name: 'John Doe', date: '2023-10-01', email: 'john.doe@example.com', status: 'Present' },
    { id: 2, name: 'Jane Smith', date: '2023-10-01', email: 'jane.smith@example.com', status: 'Absent' },
    { id: 3, name: 'Alice Johnson', date: '2023-10-02', email: 'alice.johnson@example.com', status: 'Present' },
    { id: 4, name: 'Bob Brown', date: '2024-12-08', email: 'bob.brown@example.com', status: 'Absent' },
    { id: 1, name: 'John Doe', date: '2023-10-01', email: 'john.doe@example.com', status: 'Present' },
    { id: 2, name: 'Jane Smith', date: '2023-10-01', email: 'jane.smith@example.com', status: 'Absent' },
    { id: 3, name: 'Alice Johnson', date: '2023-10-02', email: 'alice.johnson@example.com', status: 'Present' },
    { id: 4, name: 'Bob Brown', date: '2024-12-08', email: 'bob.brown@example.com', status: 'Absent' },
  ];

  // Format date into YYYY-MM-DD format
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // Add leading zero for single-digit months
    const day = ('0' + d.getDate()).slice(-2); // Add leading zero for single-digit days
    return `${year}-${month}-${day}`;
  };

  // Enhanced Filter logic based on search term and selected date
  const filteredData = attendanceData
    .filter((entry) => {
      const searchMatch =
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase());

      const dateMatch = selectedDate
        ? formatDate(entry.date) === formatDate(selectedDate) // Compare formatted dates
        : true; // Matches if no date is selected

      return searchMatch && dateMatch;
    });

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    const tableColumnHeaders = ['NO', 'Employee Name', 'Date', 'Email', 'Status']; // Define table headers
    const tableRows = filteredData.map((entry, index) => [
      index + 1, // Row number
      entry.name,
      entry.date,
      entry.email,
      entry.status,
    ]); // Map data to rows

    // Add title to PDF
    doc.text('Attendance Report', 14, 10); // Add title
    doc.autoTable({
      head: [tableColumnHeaders], // Add headers
      body: tableRows, // Add data rows
      startY: 20, // Set table start position
    });

    // Save the PDF
    doc.save('Attendance_Report.pdf');
  };

  return (
    <div className="admin-attendance-container">
      <Navbar />
      <div className="d-flex">
        <Sidebar sidebarVisible={sidebarVisible} />
        <div className="main-content p-4">
          <div className="breadcrumb mb-2">
            <h5>
              Home /{' '}
              <span style={{ color: '#24757E' }}>Attendance</span>
            </h5>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="page-title text-center">Attendance</h4>

              {/* Controls Section */}
              <div className="controls-section d-flex justify-content-between align-items-center my-2">
                {/* Sort Date Button */}
                <div className="d-flex align-items-center position-relative">
                  <button
                    className="btn control-btn me-2 d-flex align-items-center justify-content-between mb-1"
                    onClick={handleSortDateClick}
                  >
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Sort Date'}
                    <i className="bi bi-calendar ms-2"></i> {/* Bootstrap calendar icon */}
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

                {/* Search Bar with Icon */}
                <div className="search-bar-container position-relative d-flex">
                  <input
                    type="text"
                    className="form-control search-bar me-2"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                  />
                  <button className="btn search-bar-icon-btn">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>

              {/* Reset and Download Buttons */}
              <div className="d-flex gap-2 mb-1">
                <button
                  className="btn reset-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDate(null);
                  }}
                >
                  Reset
                </button>
                <button className="btn download-btn" onClick={handleDownloadPDF}>
                  Download
                </button>
              </div>

              {/* Table */}
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
                        <td>{entry.date}</td>
                        <td>{entry.email}</td>
                        <td>{entry.status}</td>
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
