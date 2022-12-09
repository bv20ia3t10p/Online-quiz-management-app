import React, { useContext, useEffect, useReducer } from "react";
import { useGlobalContext } from "../setup/Context";
import { studentReducer } from "./studentReducer";
import { fetchClass, fetchStudentInfo } from "./fetchStudentInfo";

const studentContext = React.createContext();
const initialState = {
  currentClass: { className: "", classId: "" },
  name: "",
  phone: "",
  email: "",
  ID: "",
  isSelectingClass: false,
  classList: [],
  isTakingExam: false,
};

export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  const { uid, phpHandler } = useGlobalContext();
  useEffect(() => {
    if (!uid) return;
    setUID(uid);
    fetchStudentInfo(phpHandler, uid, setStudentInfo);
    fetchClass(phpHandler, uid, setClassList);
  }, [phpHandler, uid]);
  const setIsSelectingClass = (selection) => {
    if (selection) dispatch({ type: "SELECT_CLASS" });
    else dispatch({ type: "CLOSE_SELECT_CLASS" });
  };
  const setUID = (data) => {
    dispatch({ type: "SET_UID", payload: data });
  };
  const setStudentInfo = (data) => {
    dispatch({ type: "SET_STUDENT_INF", payload: data });
  };
  const setClassList = (data) => {
    dispatch({ type: "SET_CLASS_LIST", payload: [...data] });
  };
  const setCurrentClass = (data) => {
    dispatch({ type: "SET_CURRENT_CLASS", payload: data });
  };
  const setIsTakingExam = (choice) => {
    dispatch({ type: "SET_TAKE_EXAM", payload: choice });
  };
  return (
    <studentContext.Provider
      value={{
        ...state,
        setIsSelectingClass,
        setStudentInfo,
        setClassList,
        setCurrentClass,
        setIsTakingExam,
      }}
    >
      {children}
    </studentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(studentContext);
};
