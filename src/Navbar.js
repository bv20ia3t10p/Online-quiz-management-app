import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./setup/Context";
import image from "./images/ico.png";

const Navbar = () => {
  const { uid, privilege } = useGlobalContext();
  return (
    <nav className=" bg-yellow-300 grid grid-rows-1 grid-cols-10 aboslute w-screen h-10 items-center justify-center">
      <img
        className="h-10 col-start-1 col-end-1"
        src={image}
        alt="Quizzer"
      ></img>
      <Link
        to="/"
        className="translate-x-[-7vw] w-20 text-center col-start-2 col-end-2 bg-amber-400 text-amber-900 py-2 rounded-md text-sm font-medium"
      >
        Home
      </Link>
      <h3 className="translate-x-[-10vw] text-sm text-amber-900 col-span-2">
        Hello, {privilege} {uid}
      </h3>
      <h3
        className="translate-x-[-3vw] text-red-600 text-xl font-bold underline font-mono italic 
      antialised tracking-widest decoration-2 decoration-amber-500 drop-shadow-md col-span-5"
      >
        Online quiz management app
      </h3>
      <button className="text-amber-900 bg-amber-400 px-3 py-2 ml-30 rounded-md text-sm font-medium float-right">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
