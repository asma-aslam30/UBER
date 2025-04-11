import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="bg-light ">
      <div className=" bg-cover bg-center  bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1710101362/assets/13/bd753e-2843-44d4-9aff-cc44c3062e95/original/SS_Commuter.jpg)] h-screen pt-8 flex justify-between flex-col  w-full">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link to='/login' className="text-xl w-full bg-black text-white py-3 rounded mt-5 flex items-center justify-center gap-4">
            Continue <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
