import { useState, React, useEffect } from "react";
import { useGlobalContext } from "../setup/Context";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "./localStorage";
import logo from "../images/ico.png";
import { AiOutlineIdcard, AiOutlineKey } from "react-icons/ai";

const initialState = {
  uid: "",
  pw: "",
  localUid: getLocalStorage(),
};
// design idea: https://colorlib.com/wp/html5-and-css3-login-forms/

const Login = () => {
  const { handleLogin, isLoggedIn, privilege } = useGlobalContext();
  const [state, setState] = useState({ ...initialState });
  const handleChange = (e) => {
    const name = e.target.name;
    setState({ ...state, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.uid === initialState.uid || state.pw === initialState.pw) {
      alert("Please enter your own input");
      return;
    }
    handleLogin(state.uid, state.pw);
    localStorage.setItem("uid", JSON.stringify({ uid: state.uid }));
  };
  const navi = useNavigate();
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) return;
    switch (privilege) {
      case "Student":
        navi("Student/Home");
        break;
      case "Lecturer": {
        navi("/Lecturer/Home");
        break;
      }
      default: {
        navi("/Admin/Home");
      }
    }
  }, [isLoggedIn, privilege, navi]);
  return (
    <main className="loginPage">
      <form className="loginPage-form" onSubmit={handleSubmit}>
        <div className="loginPage-heading">Login</div>
        <label htmlFor="uid" className="loginPage-input-usr-label">
          Username
        </label>
        <div className="loginPage-input-usr-container">
          <AiOutlineIdcard className="ico" />
          <input
            type="text"
            name="uid"
            id="uid"
            placeholder="Enter user ID (Provided by the school)"
            className="loginPage-input-usr-field"
            value={state.uid}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="pw" className="loginPage-input-usr-label">
          Password
        </label>
        <div className="loginPage-input-usr-container">
          <AiOutlineKey className="ico" />
          <input
            className="loginPage-input-pw-field"
            type="password"
            name="pw"
            id="pw"
            value={state.pw}
            onChange={handleChange}
            placeholder={"User's account password"}
          />
        </div>
        <div className="loginPage-submit-container">
          <button className="loginPage-submit" type="submit">
            LOGIN
          </button>
        </div>
      </form>
      <div className="loginPage-background">
        <div className="loginPage-background-text">Hey there,</div>
        <div className="loginPage-background-text">
          this is <img src={logo} alt="Q" /> <span>uizzer</span>
        </div>
      </div>
    </main>
  );
};

export default Login;
