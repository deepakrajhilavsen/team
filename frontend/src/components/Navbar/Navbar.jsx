import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex  justify-between items-center p-[3rem]">
      <div className="logoDiv">
        <h1 className="logo text-[25px] text-blueColor">
          <strong>Job</strong>Portal
        </h1>
      </div>
      <div className="menu flex gap-8">
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">Jobs</li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">
          Companies
        </li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">About</li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">
          Contact
        </li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">
          {" "}
          <Link
            to="/signup"
            className="menuList text-[#6f6f6f] hover:text-blueColor"
          >
            Signup
          </Link>
        </li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">
          <Link to="/login">Login</Link>
        </li>
        <li className="menuList flex items-center text-[#6f6f6f] hover:text-blueColor">
          <MdAccountCircle className="mr-2" />
          <Link to="/profile">Profile</Link>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
