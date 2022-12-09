import React from "react";
import { StudentContextProvider } from "./studentContext";

const StudentPage = ({ children }) => {
  return <StudentContextProvider>{children}</StudentContextProvider>;
};

export default StudentPage;
