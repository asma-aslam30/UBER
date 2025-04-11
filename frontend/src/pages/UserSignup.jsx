import React, { useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
// import UserDataContext from "../context/UserDataContext"; // Sahi import

const UserSignup = () => {
  // const { user, setUser } = useContext(); // Context se user data lo
  // console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        // setUser(response.data.user); // Context ko update karo
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during signup", error);
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <form onSubmit={submitHandler}>
        <h3 className="text-base font-medium">What's your name?</h3>
        <div className="flex gap-4 mb-2">
        <input
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-[#eeeeee] rounded  text-base placeholder:text-sm px-4 w-1/2 py-2 mt-2 border  "
              required
        />
        <input
          type="text"
          placeholder="Lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-[#eeeeee] rounded  text-base placeholder:text-sm px-4 py-2 mt-2 w-1/2  border "
              required
        />
        </div>
        <h3 className="text-base font-medium ">What's your email?</h3>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#eeeeee] rounded  text-lg placeholder:text-sm px-4 py-2 mt-2 mb-2 border w-full"
          required
        />
        <h3 className="text-base font-medium">Enter your Password</h3>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#eeeeee] rounded  text-lg placeholder:text-sm px-4 py-2 mt-2 mb-4 border w-full"
            required
        />
        <Button type="submit"
         className="text-xl  w-full bg-black text-white py-3 rounded mt-5 flex items-center justify-center gap-4">Create Account</Button>
          <p className="text-center mt-3">
                     Already have an account?{" "}
                     <Link to="/login" className=" text-blue-600 ">
                       Login here
                     </Link>
                   </p>
      </form>
    </div>
  );
};

export default UserSignup;
