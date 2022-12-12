import React from "react";
import { useGlobalContext } from "../setup/Context";
import { StudentContextProvider } from "./studentContext";
import StudentSelectClassModal from "./StudentSelectClassModal";
import StudentSidebar from "./StudentSidebar";

const StudentPage = ({ children }) => {
  const { isDimmed } = useGlobalContext();
  console.log(isDimmed);
  return (
    <StudentContextProvider>
      <StudentSidebar />
      <StudentSelectClassModal />
      <main
        className={`${isDimmed ? "student-content dimmed" : "student-content"}`}
      >
        {children}
      </main>
    </StudentContextProvider>
  );
};

export default StudentPage;
