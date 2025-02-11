import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = ({ uname }) => {
    const navigate = useNavigate();

    // Function to extract initials
    const getInitials = (name) => {
        if (!name) return "";
        const nameParts = name.trim().split(" ");
        return nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
            : nameParts[0][0].toUpperCase();
    };

    const handleLogout = () => {
        Cookies.remove("token");
        navigate("/signin");
    };

    return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">My Todo List</h1>
      <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-black font-bold rounded-full mr-2">
                  {getInitials(uname)}
              </div>
              <span className="text-lg font-medium hidden md:inline">{uname}</span>
          </div>
          <button onClick={handleLogout} className="text-xl text-black">
              <i className="fas fa-sign-out-alt text-xl mx-3"></i>
          </button>
      </div>
  </nav>
  
    );
};

export default Navbar;
