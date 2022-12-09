import React, { useEffect } from "react";
import { useContext, useReducer } from "react";
import reducer from "./reducer";
import { getLocalStorage } from "../Login/localStorage";

const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  uid: getLocalStorage().uid,
  phpHandler: "http://localhost/onlineexamapp.php",
  privilege: "Not logged in",
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.uid) dispatch({ type: "LOG_IN", payload: state.uid });
  }, [state.uid]);
  const handleLogin = async (uid, pw) => {
    //Concat string from form input with uid and pw as Login's state
    const url = state.phpHandler + `?uid=${uid}&pw=${pw}`;
    const resp = await fetch(url);
    const data = await resp.json();
    //Return array if theres data, otherwise undefined
    if (typeof data) alert("Login successful");
    else {
      alert("Login failed, please recheck credentials");
      //Abort operation
      return;
    }
    //Change the gloabal state
    dispatch({ type: "LOG_IN", payload: uid });
  };
  const setLoggedIn = (uid) => {
    dispatch({ type: "LOG_IN", payload: uid });
  };
  return (
    <AppContext.Provider value={{ setLoggedIn, handleLogin, ...state }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, Context };
