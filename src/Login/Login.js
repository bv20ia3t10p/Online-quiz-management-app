import { useState, React, useEffect } from "react";
import { useGlobalContext } from "../setup/Context";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "./localStorage";

const initialState = {
  uid: "Enter your user id here",
  pw: "A password field!",
  localUid: getLocalStorage(),
};

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
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Welcome,</h2>
          <h3>please enter your login crendentials</h3>
          <div>
            <label htmlFor="uid" className="login-label-uid">
              User ID
            </label>
            <input
              type="text"
              name="uid"
              id="uid"
              className="login-inp-uid"
              value={state.uid}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="pw" className="login-label-pw">
              Password (Provided by the school)
            </label>
            <input
              type="password"
              name="pw"
              id="pw"
              value={state.pw}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
