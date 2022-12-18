import React, { useEffect, useContext, useReducer } from "react";
import { useGlobalContext } from "../setup/Context";
import { lecReducer } from "./lecReducer";

const lecContext = React.createContext();

const initialState = {
  id: 0,
  name: "",
  phone: "",
  email: "",
  classes: [],
};

const fetchLecInfo = async (phpHandler, uid, setLecInfo) => {
  const url = phpHandler + `?getLecInfo=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  const lecInfo = {
    name: data[0].name,
    id: data[0].id,
    phone: data[0].phone,
    email: data[0].email,
  };
  const classes = data.map((n) => {
    return (({
      classID,
      className,
      subject,
      classAvg,
      examNumbers,
      subjectID,
      subjectName,
    }) => ({
      classID,
      className,
      subject,
      classAvg,
      subjectID,
      examNumbers,
      subjectName,
    }))(n);
  });
  const newLecInfo = { ...lecInfo, classes };
  setLecInfo(newLecInfo);
};

const LecContext = ({ children }) => {
  const { uid, phpHandler, setIsDimmed } = useGlobalContext();
  const [state, dispatch] = useReducer(lecReducer, initialState);
  const setLecInfo = (data) => {
    dispatch({ type: "SET_LEC_INF", payload: data });
  };
  useEffect(() => {
    if (!uid) return;
    fetchLecInfo(phpHandler, uid, setLecInfo);
  }, [phpHandler, uid]);
  return (
    <lecContext.Provider value={{ ...state, setIsDimmed }}>
      {children}
    </lecContext.Provider>
  );
};

export const useLecContext = () => {
  return useContext(lecContext);
};

export default LecContext;
