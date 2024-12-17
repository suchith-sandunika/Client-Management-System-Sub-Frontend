import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import '../css/AddAttendancePopup.css';

const AddAttendancePopup = ({ closePopup }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setDate(e.target.value); // Update state with selected date
      };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitData = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if(name === '' || date === '' || email === '' || !validateEmail(email)) {
            toast.error('Please fill all necessary fields');
            return;
        } else {
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
                    toast.success('Visit Confirmation Successfull!')
                    closePopup(); // Close the popup after successful submission
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                toast.error('A network error occurred. Please try again later.');
            }
        }
    }

    return (
        <div className='text-white'>
            <h5 className='text-center mb-3'>Attendance</h5>
            <form className='align-content-center'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                    <label htmlFor='name' className='pt-2 w-25 text-start'>User Name</label>
                    <input type="text" placeholder='Silva' className='w-75' required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='d-flex justify-content-between mt-1 align-items-start mb-3'>
                    <label htmlFor='date-input' className='pt-2 w-25 text-start'>Date</label>
                    <input id="date-input" type="date" value={date} required className='w-75 date-input' onChange={handleChange}/>
                </div>
                <div className='d-flex justify-content-between mt-1 align-items-start mb-3'>
                    <label htmlFor='email' className='pt-2 w-25 text-start'>Email</label>
                    <input type="text" placeholder='silva@gmail.com' className='w-75' required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <p className='text-center'>
                    Attendance recorded! Thank you for visiting our employees today.
                    Your daily visits help us maintain excellent service!
                </p>
                <button type='submit' className='text-white text-center align-items-center' onClick={submitData}>
                    Confirm Visit
                </button>
            </form>
            <ToastContainer className='mt-5'/>
        </div>
    )
}
export default AddAttendancePopup
