import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../css/Sidebar.css';
import attendence from '../../assets/attendence.png';
import mail from '../../assets/mail.png';
import task from '../../assets/task.png';
import payment from '../../assets/payment.png';
import invoice from '../../assets/invoice.png';

const Sidebar = ({ sidebarVisible }) => {
  return (
    <div className={`sidebar ${sidebarVisible ? 'show-sidebar' : ''}`}>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin-attendance"> {/* Use Link for navigation */}
            <img src={attendence} alt="Attendance" style={{ width: '20px', marginRight: '14px' }} /> 
            Attendance
          </Link>
        </li>
        <li>
          <Link to="#invoice">
            <img src={invoice} alt="Invoice" style={{ width: '20px', marginRight: '14px' }} /> 
            Invoice
          </Link>
        </li>
        <li>
          <Link to="#payment">
            <img src={payment} alt="Payment" style={{ width: '20px', marginRight: '14px' }} /> 
            Payment
          </Link>
        </li>
        <li>
          <Link to="#task">
            <img src={task} alt="Task" style={{ width: '20px', marginRight: '14px' }} /> 
            Task
          </Link>
        </li>
        <li>
          <Link to="#mailbox">
            <img src={mail} alt="Mail-Box" style={{ width: '20px', marginRight: '14px' }} /> 
            Mail-Box
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;