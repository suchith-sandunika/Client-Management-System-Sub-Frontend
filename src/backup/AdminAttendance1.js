// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/templetes/Navbar';
// import Footer from '../../components/PagesFooter';
// import Sidebar from '../../components/templetes/SideBar';
// import DatePicker from 'react-datepicker';
// import searchIcon from '../../assets/image.png';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../../css/AdminAttendance.css';
// import 'jspdf-autotable';

// const AdminAttendance = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [attendanceData, setAttendanceData] = useState([]); // State to hold attendance data
//   const [filteredData, setFilteredData] = useState([]); // State for filtered data

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const handleSortDateClick = () => {
//     if (showDatePicker) {
//       setSelectedDate(null);
//     }
//     setShowDatePicker(!showDatePicker);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setShowDatePicker(false);
//   };

//   // Fetch attendance data from the backend
//   const fetchAttendanceData = async () => {
//     try {
//       const response = await fetch('http://localhost:8800/api/admin/ViewAllAttendances');
//       const data = await response.json();
//       setAttendanceData(data);
//       setFilteredData(data); // Initially show all data
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAttendanceData(); // Fetch data on component mount
//   }, []);

//   // Format date into YYYY-MM-DD format (removes time)
//   const formatDate = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = ('0' + (d.getMonth() + 1)).slice(-2);
//     const day = ('0' + d.getDate()).slice(-2);
//     return `${year}-${month}-${day}`; // Only the date portion
//   };

//   // Enhanced Filter logic based on search term and selected date
//   useEffect(() => {
//     const filtered = attendanceData.filter((entry) => {
//       const searchMatch =
//           entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           entry.email.toLowerCase().includes(searchTerm.toLowerCase());

//       const dateMatch = selectedDate
//           ? formatDate(entry.date) === formatDate(selectedDate)
//           : true;

//       return searchMatch && dateMatch;
//     });
//     setFilteredData(filtered);
//   }, [attendanceData, searchTerm, selectedDate]);

//   // Function to handle PDF download
//   const handleDownloadPDF = async () => {
//     try {
//       const response = await fetch('http://localhost:8800/api/admin/generatePDF', { method: 'GET' });
//       const blob = await response.blob();
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'Attendance_Report.pdf';
//       link.click();
//     } catch (error) {
//       console.error('Error downloading PDF:', error);
//     }
//   };

//   // Add this function to handle the reset button click
//   const handleReset = async () => {
//     try {
//       const response = await fetch('http://localhost:8800/api/admin/resetData', { method: 'GET' });
//       const result = await response.json();
//       if (response.ok) {
//         // Reset the attendance data in the frontend after clearing the database
//         setAttendanceData([]);
//         setFilteredData([]);
//         alert("Attendance data has been reset.");
//       } else {
//         alert("Error resetting attendance data.");
//       }
//     } catch (error) {
//       console.error('Error resetting attendance data:', error);
//       alert("Error resetting attendance data.");
//     }
//   };

//   return (
//     <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
//       <Navbar />
//       <button className="sidebar-toggle" onClick={toggleSidebar}>
//         ☰
//       </button>
//       <div className={`flex-grow-1 d-flex ${sidebarVisible ? 'show-sidebar' : ''}`}>
//         <Sidebar sidebarVisible={sidebarVisible} />
//         <div className="main-content p-4">
//             <div className="ekr-breadcrumb mb-1">
//               <h5>
//                 Home /{' '}
//                 <span style={{ color: '#24757E' }}>Attendance</span>
//               </h5>
//             </div>

//             <div className="card shadow-sm border-0">
//               <div className="card-body">
//                 <h4 className="ekr-page-title text-center">Attendance</h4>

//                 <div className="ekr-controls-section d-flex justify-content-between align-items-center my-2">
//                   <div className="d-flex align-items-center position-relative">
//                     <button
//                         className="btn ekr-control-btn me-2 d-flex align-items-center justify-content-between mb-1 pb-1"
//                         onClick={handleSortDateClick}
//                     >
//                       {selectedDate ? selectedDate.toLocaleDateString() : 'Sort Date'}
//                       <i className="bi bi-calendar ms-2 border-0"></i>
//                     </button>
//                     {showDatePicker && (
//                         <div className="ekr-date-picker-container position-absolute">
//                           <DatePicker
//                               selected={selectedDate}
//                               onChange={handleDateChange}
//                               dateFormat="yyyy/MM/dd"
//                               className="form-control ms-2"
//                               placeholderText="Select a date"
//                               inline
//                           />
//                         </div>
//                     )}
//                   </div>

//                   <div className="ekr-search-bar-container position-relative d-flex">
//                     <input
//                         type="text"
//                         className="form-control ekr-search-bar me-2"
//                         placeholder="Search"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <button className="btn ekr-search-bar-icon">
//                       <img alt="Search Icon" src={searchIcon} className="ekr-search-icon"/>
//                       {/* <i className="bi bi-search"></i> */}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="d-flex gap-2 mb-1 ekr-button-row">
//                   <button
//                       className="btn ekr-reset-btn"
//                       onClick={handleReset} // Updated to use handleReset
//                   >
//                     Reset
//                   </button>
//                   <button className="btn ekr-download-btn" onClick={handleDownloadPDF}>
//                     Download
//                   </button>
//                 </div>

//                 <div className="ekr-scrollable-table">
//                   <table className="ekr-attendance-table table table-bordered">
//                     <thead className="thead-light">
//                       <tr className='w-100'>
//                         <th className='w-15'>No</th>
//                         <th className='w-25'>Employee Name</th>
//                         <th className='w-20'>Date</th>
//                         <th className='w-25'>Email</th>
//                         <th className='w-15'>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                     {filteredData.map((entry, index) => (
//                         <tr key={entry.name} className='w-100 text-center'>
//                           <td className='w-15'>{entry.RowNumber}</td>
//                           <td className='w-25'>{entry.name}</td>
//                           <td className='w-20'>{formatDate(entry.date)}</td> {/* Display formatted date */}
//                           <td className='w-25'>{entry.email}</td>
//                           <td className='w-15 fw-bold'>{entry.status}</td> 
//                         </tr>
//                     ))}
//                     {filteredData.length === 0 && (
//                         <tr className='w-100 text-center'>
//                           <td className='w-100 border-0 fw-bold' colSpan="5">
//                             No matching records found
//                           </td>
//                         </tr>
//                     )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//         </div> 
//       </div>
//       <Footer />              
//     </div>
//   );
// };

// export default AdminAttendance;
