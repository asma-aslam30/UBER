import React from 'react'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useState } from 'react';


const CaptainLogin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [captainData,setcaptainData] = useState([{}])
    
    const submitHandler = (e) => {
            e.preventDefault(); // Form submit hone se page reload na ho
            setcaptainData({email:email,password:password})
            console.log(captainData);
            setEmail('')
            setPassword('')
            
        };
        
        
  return (
    <div className=' px-5 py-5 p-7 h-screen flex flex-col justify-between '>
        <div>
        <img
          className="w-16 mb-5 mt-4"
          src="images/uber driver logo.png"
        />
        <form onSubmit={submitHandler}>
      <h3 className='text-lg font-medium'>What's your Captain email</h3>
      <input type="email" placeholder="Enter your Email" value= {email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] rounded  text-lg placeholder:text-base px-4 py-2 mt-2 mb-2 border w-full' required/>
      <h3 className='text-lg font-medium'>Enter your Password</h3>
      <input type="password" placeholder="Enter your Password" value= {password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-[#eeeeee] rounded  text-lg placeholder:text-base px-4 py-2 mt-2 mb-2 border w-full' required/><br></br>
      <Button  type="submit" className="text-xl  w-full bg-black text-white py-3 rounded mt-5 flex items-center justify-center gap-4">Login</Button>
      </form>
      <p className='text-center mt-3'>Join a fleet? <Link to='/captain-signup' className=' text-blue-600 '>Register as a Captain </Link></p>

        </div>
        <div className='mt-3'>
            <Link to='/login' className=' text-white rounded flex items-center justify-center py-2 w-full text-lg placeholder:text-base bg-[#f3c267]'>Sign in as a User </Link>
        </div>
    </div>
  )
}

export default CaptainLogin

