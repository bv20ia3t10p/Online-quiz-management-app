import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./setup/Context";
import image from "./images/ico.png";
import { AiOutlineHome, AiOutlinePoweroff } from "react-icons/ai";

const Navbar = () => {
  const { uid, privilege, isLoggedIn, setLoggedOut } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setLoggedOut();
    navigate("/");
  };
  if (isLoggedIn)
    return (
      <nav className="navBar">
        <img className="navBar-logo" src={image} alt="Quizzer"></img>
        <h1 className="navBar-logo-text">uizzer</h1>
        <h3 className="navBar-usr">
          Hello, {privilege} {uid}
        </h3>
        <div className="navBar-home">
          <AiOutlineHome className="icon" />
          <Link to="/" className="text">
            Home
          </Link>
        </div>
        <div className="navBar-logOut">
          <AiOutlinePoweroff className="icon" />
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      </nav>
    );
  else return <></>;
};

export default Navbar;
