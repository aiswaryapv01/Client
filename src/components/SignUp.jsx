
import React, { useState } from 'react'
import  loginImg from '../assets/students.png'
import { Link, useNavigate } from 'react-router-dom';


import axios from 'axios';

//const bcrypt = require('bcryptjs');
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [contactError, setContactError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const navigate = useNavigate();
    const checkIfEmailExists = async (email) => {
        try {
          const response = await fetch(`/api/check-email?email=${email}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data.exists;
        } catch (error) {
          console.error('Error:', error);
          // Handle the error here, e.g., display a message to the user
          return false; // Return false indicating that the email check failed
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const contactRegex = /^\d{10,}$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            setPasswordError('Password must be strong (A minimum 8 characters password contains a combination of uppercase and lowercase letter, number & special character are required)');
        }
        else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        }
        else if (!contactRegex.test(contact)) {
            setContactError('Contact number must be at least 10 digits long and contain only numbers');
        }
        else {
            try {
                const emailExists = await checkIfEmailExists(email);
                if (emailExists) {
                    setEmailError('Email address is already registered');
                } else {
                   // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

                    const result = await axios.post('https://mern-backend-u7se.onrender.com/register', { name, email, password, contact });
                    console.log(result);
                    // Navigate to the next page on successful registration
                    const userData = { name, email, contact };
                   
                    navigate('/profile', { state: userData });
                }
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 400) {
                    setEmailError('Email address is already registered');
                } else {
                    setEmailError('An error occurred during registration');
                }
            }
        }
    };
    
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            setPasswordError('Password must be strong (A minimum 8 characters password contains a combination of uppercase and lowercase letter, number & special character are required)');
          }
          else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
          }
          else {
            const emailExists = await checkIfEmailExists(email);
          if (emailExists) {
        setEmailError('Email address is already registered');
      } else{
        axios.post('https://mern-backend-u7se.onrender.com/register', { name, email, password, contact })
        .then(result => {
            console.log(result);
            // Navigate to the next page on successful registration
            navigate('/Profile');
        })
        .catch(err=> console.log(err));}}
    };
    
  return (
    
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        
         <div className='hidden sm:block' style={{ position: 'relative' }}>

<img
    className='w-full h-full object-cover'
    src={loginImg}
    alt=""
    style={{
       position: 'absolute',
       top: 0,
       left: 0,
       width: '100%',
       height: '100%',
       objectFit: 'cover',
       zIndex: -1,
   }}
/>
<div
   style={{
       position: 'absolute',
       top: 0,
       left: 0,
       width: '100%',
       height: '100%',
       background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
       zIndex: 0,
   }}
></div>
</div>

      

        <div className='bg-gray-800 flex flex-col justify-center' >
            
            <form onSubmit={handleSubmit} className='max-w-[500px] w-full mx-auto rounded-lg bg-gray-900 p-8 py-12 px-8'>
                <h2 className='text-2xl text-white font-bold text-center pb-5'>Register Here</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label >Full Name:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500  ' type="text"
                    onChange={(e) => setName(e.target.value)} 
                    required/>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email ID:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500' type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                   />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label >Contact Number:</label>
                    <input className='border  bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500' type="text"
                    onChange={(e) => setContact(e.target.value)} 
                    required/>
                     {contactError && <span className="text-red-500">{contactError}</span>}
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500' type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                     required/>
                     {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
                
                <div className='flex flex-col text-gray-400 py-2'>
                    <label >Confirm Password:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500' type="password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                    {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                </div>
               
               
               
  <button type="submit" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>

                
                
                
            </form> 
        </div>
    </div>
    
  )
}

export default SignUp
