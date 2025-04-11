import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault(); // Form submit hone se page reload na ho
    setUserData({ 
        fullnName:{
            firstName:firstName,
            lastName:lastName
        },
        email: email,
         password: password });
         console.log(userData
         );
    setEmail("");
    setPassword("");
    setfirstName("");
    setLastName("");
    
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
      <img
          className="w-16 mb-5 mt-4"
          src="images/uber driver logo.png"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium">What's your Captain name</h3>
          <div className="flex gap-4 mb-2">
            <input
              type="text"
              placeholder="Firstname"
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              className="bg-[#eeeeee] rounded  text-base placeholder:text-sm px-4 w-1/2 py-2 mt-2 border  "
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee] rounded  text-base placeholder:text-sm px-4 py- mt-2 w-1/2  border "
              required
            />
          </div>
          <h3 className="text-base font-medium ">What's your Captain email</h3>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            className="bg-[#eeeeee] rounded  text-lg placeholder:text-sm px-4 py-2 mt-2 mb-2 border w-full"
            required
          />
          <h3 className="text-base font-medium">Enter your Password</h3>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
              onChange={(e) => {
                 setPassword(e.target.value);
              }}
            className="bg-[#eeeeee] rounded  text-lg placeholder:text-sm px-4 py-2 mt-2 mb-4 border w-full"
            required
          />
          <br></br>
          <Button
            type="submit"
            className="text-xl  w-full bg-black text-white py-3 rounded mt-5 flex items-center justify-center gap-4"
          >
            Login
          </Button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/captain-login" className=" text-blue-600 ">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div className="mt-3">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
