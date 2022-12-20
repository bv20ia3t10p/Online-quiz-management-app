import React, { useEffect, useContext, useReducer } from "react";
import { useGlobalContext } from "../setup/Context";
import { adminReducer } from "./adminReducer";
import AdminSideBar from "./AdminSideBar";

const adminContext = React.createContext();

const initialState = {
  ID: 0,
  name: "",
  phone: "",
  email: "",
};

const fetchAdminInfo = async (phpHandler, uid, setAdminInfo) => {
  const url = phpHandler + `?getAdminInfo=${uid}`;
  console.log("Fetch admin info:", url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get admin info");
    setAdminInfo(data);
  } catch (e) {
    alert(e);
  }
};

const AdminContext = ({ children }) => {
  const { uid, phpHandler } = useGlobalContext();
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const setAdminInfo = (data) => {
    dispatch({ type: "SET_ADMIN_INFO", payload: data });
  };
  useEffect(() => {
    if (!uid) return;
    if (state.ID > 0) return;
    fetchAdminInfo(phpHandler, uid, setAdminInfo);
  });
  return (
    <adminContext.Provider value={{ ...state }}>
      {children}
    </adminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(adminContext);
};

export default AdminContext;
