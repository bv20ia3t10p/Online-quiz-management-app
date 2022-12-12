import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./setup/Context";
import image from "./images/ico.png";

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
        <Link to="/" className="navBar-home">
          Home
        </Link>
        <h3 className="navBar-usr">
          Hello, {privilege} {uid}
        </h3>
        <h3 className="navBar-title">Online quiz management app</h3>
        <button onClick={() => handleLogout()} className="navBar-logOut">
          Logout
        </button>
      </nav>
    );
  else return <></>;
};

export default Navbar;
