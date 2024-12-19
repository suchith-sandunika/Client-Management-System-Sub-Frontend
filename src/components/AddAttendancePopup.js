import React, { useState, useEffect } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import CloseButton from '../assets/closeButton.png';
import '../css/AddAttendancePopup.css';
import 'react-toastify/dist/ReactToastify.css';

const AddAttendancePopup = ({ closePopup }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState(''); 

    const current_date = new Date();
    const currentHour = current_date.getHours();
    const currentMinute = current_date.getMinutes();

    useEffect(() => {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        setDate(today); // Set the current date as default
        console.log(current_date);
        console.log(currentHour);
        console.log(currentMinute);
    }, []); 

    const formatDateToDMY = (date) => {
        // for attendance taking conditions ...
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        setDate(formatDateToDMY(e.target.value)); // Update state with selected date
    };

    // const validateEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    const submitData = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log(name, date, email);
        try {
            const response =  await fetch('http://localhost:8800/api/employees/addAttendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, date, email })
            })
            if(!response.ok) {
                const errorMessage = await response.text();
                toast.error(`Error Occurred: ${errorMessage || 'Unknown error'}`);
                return;
            } else {
                const responseData = await response.json();
                console.log(responseData);
                if(currentHour < 8 || currentHour > 17 || currentMinute > 60) {
                    console.log('Time Error');
                    toast.error('Attendance can only be added between 8:00 AM and 5:00 PM, The working hours!');
                    closePopup();
                } else {
                    console.log('No Error');
                    toast.success('Visit Confirmation Successfull!')
                    closePopup(); // Close the popup after successful submission ...
                    window.location.reload();
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('A network error occurred. Please try again later.');
        }
    }

    return (
        <div className='text-white'>
            <div className='ekr-close-button-container'>
                    <img src={CloseButton} alt='Close' className='ekr-close-button' onClick={closePopup}/>
            </div>
            <h5 className='text-center mb-3'>Attendance</h5>
            <form className='align-content-center'  style={{ position: 'relative' }}>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <label htmlFor='name' className='pt-2 w-25 text-start'>User Name</label>
                    <input type="text" placeholder='User Name' className='w-75' required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='d-flex justify-content-between mt-1 align-items-start mb-3'>
                    <label htmlFor='date-input' className='pt-2 w-25 text-start'>Date</label>
                    <input id="date-input" type="date" value={date} required className='w-75 date-input' onChange={handleChange}/>
                </div>
                <div className='d-flex justify-content-between mt-1 align-items-start mb-3'>
                    <label htmlFor='email' className='pt-2 w-25 text-start'>Email</label>
                    <input type="text" placeholder='Email' className='w-75' required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <p className='text-center'>
                    Attendance recorded! Thank you for visiting our employees today.
                    Your daily visits help us maintain excellent service!
                </p>
                <button type='submit' className='text-white text-center align-items-center' onClick={submitData}>
                    Confirm Visit
                </button>
            </form>
            <ToastContainer className='mt-5 ekr-custom-toast-container'/>
        </div>
    )
}
export default AddAttendancePopup
