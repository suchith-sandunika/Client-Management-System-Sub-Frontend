import React, { useState, useEffect } from 'react';
import Navbar from '../../components/templetes/Navbar';
import Footer from '../../components/PagesFooter';
import Sidebar from '../../components/templetes/SideBar';
import DatePicker from 'react-datepicker';
import searchIcon from '../../assets/image.png';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/AdminAttendance.css';
import 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAttendance = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/admin/ViewAllAttendances');
      const data = await response.json();
      setAttendanceData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      toast.error('Failed to fetch attendance data.');
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

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

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/admin/generatePDF', { method: 'GET' });
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Attendance_Report.pdf';
      link.click();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF.');
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/admin/resetData', { method: 'GET' });
      const result = await response.json();
      if (response.ok) {
        setAttendanceData([]);
        setFilteredData([]);
        toast.success('Attendance data has been reset.');
      } else {
        toast.error('Error resetting attendance data.');
      }
    } catch (error) {
      console.error('Error resetting attendance data:', error);
      toast.error('Error resetting attendance data.');
    }
  };

  return (
    <div className="ekr-admin-attendance-container d-flex flex-column" style={{ minHeight: '100vh' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`flex-grow-1 d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
        <Sidebar sidebarVisible={sidebarVisible} />
        <div className="main-content p-4">
          <div className="ekr-breadcrumb mb-1">
            <h5>
              Home /{' '}
              <span style={{ color: '#24757E' }}>Attendance</span>
            </h5>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="ekr-page-title text-center">Attendance</h4>

              <div className="ekr-controls-section d-flex justify-content-between align-items-center my-2">
                <div className="d-flex align-items-center position-relative">
                  <button
                    className="btn ekr-control-btn me-2 d-flex align-items-center justify-content-between mb-1 pb-1"
                    onClick={handleSortDateClick}
                  >
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Sort Date'}
                    <i className="bi bi-calendar ms-2 border-0"></i>
                  </button>
                  {showDatePicker && (
                    <div className="ekr-date-picker-container position-absolute">
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

                <div className="ekr-search-bar-container position-relative d-flex">
                  <input
                    type="text"
                    className="form-control ekr-search-bar me-2"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn ekr-search-bar-icon">
                    <img alt="Search Icon" src={searchIcon} className="ekr-search-icon" />
                  </button>
                </div>
              </div>

              <div className="d-flex gap-2 mb-1 ekr-button-row">
                <button className="btn ekr-reset-btn" onClick={handleReset}>
                  Reset
                </button>
                <button className="btn ekr-download-btn" onClick={handleDownloadPDF}>
                  Download
                </button>
              </div>

              <div className="ekr-scrollable-table">
                <table className="ekr-attendance-table table table-bordered">
                  <thead className="thead-light">
                    <tr className='w-100'>
                      <th className='w-15'>No</th>
                      <th className='w-25'>Employee Name</th>
                      <th className='w-20'>Date</th>
                      <th className='w-25'>Email</th>
                      <th className='w-15'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((entry, index) => (
                      <tr key={index} className='w-100 text-center'>
                        <td className='w-15'>{index + 1}</td>
                        <td className='w-25'>{entry.name}</td>
                        <td className='w-20'>{formatDate(entry.date)}</td>
                        <td className='w-25'>{entry.email}</td>
                        <td className='w-15 fw-bold'>{entry.status}</td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr className='w-100 text-center'>
                        <td className='w-100 border-0 fw-bold' colSpan="5">
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
      <Footer style={{ position: 'relative', bottom: '0', width: '100%', zIndex: '10' }} />
    </div>
  );
};

export default AdminAttendance;
