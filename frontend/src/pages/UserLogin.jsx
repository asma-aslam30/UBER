import React from 'react'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useState } from 'react';


const UserLogin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userData,setUserData] = useState([{}])
    
    const submitHandler = (e) => {
            e.preventDefault(); // Form submit hone se page reload na ho
            setUserData({email:email,password:password})
            console.log(userData);
            setEmail('')
            setPassword('')
            
        };
        
        
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
        <div>
        <img
          className="w-16 mb-10 mt-4"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <form onSubmit={submitHandler}>
      <h3 className='text-lg font-medium'>What's your email</h3>
      <input type="email" placeholder="Enter your Email" value= {email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] rounded  text-lg placeholder:text-base px-4 py-2 mt-2 mb-2 border w-full' required/>
      <h3 className='text-lg font-medium'>Enter your Password</h3>
      <input type="password" placeholder="Enter your Password" value= {password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-[#eeeeee] rounded  text-lg placeholder:text-base px-4 py-2 mt-2 mb-2 border w-full' required/><br></br>
      <Button  type="submit" className="text-xl  w-full bg-black text-white py-3 rounded mt-5 flex items-center justify-center gap-4">Login</Button>
      <p className='text-center mt-3'>Don't have an account? <Link to='/signup' className=' text-blue-600 '>Sign up</Link></p>
      </form>
        </div>
        <div className='mt-3'>
            <Link to='/captain-login' className=' text-white rounded flex items-center justify-center py-2 w-full text-lg placeholder:text-base bg-[#f3c267]'>Sign in as a Captain </Link>
        </div>
    </div>
  )
}

export default UserLogin

