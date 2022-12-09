import React from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "./studentContext";
import StudentSelectClassModal from "./StudentSelectClassModal";

const StudentHome = () => {
  const {
    name,
    email,
    phone,
    uid,
    currentClass,
    isSelectingClass,
    setIsSelectingClass,
    setIsTakingExam,
  } = useStudentContext();
  const navigate = useNavigate();
  const navigateToExam = () => {
    if (currentClass.ID_class) {
      setIsTakingExam(true);
      navigate("/Student/Exam");
    } else alert("Please first select a class");
  };
  return (
    <>
      <aside className="student-sidebar">
        <h3>{name}</h3>
        <h3>{uid}</h3>
        <h3>{email}</h3>
        <h3>{phone}</h3>
        <h3>{currentClass.className}</h3>
        <h3>{currentClass.ID_class}</h3>
        <div className="student-function-select">
          <div className="student-sidebar-func-container">
            <button onClick={() => setIsSelectingClass(true)}>x</button>
            <h3>Select class</h3>
          </div>
          <div className="student-sidebar-func-container">
            <button onClick={() => navigateToExam()}>x</button>
            <h3>Take Exam</h3>
          </div>
          <div className="student-sidebar-func-container">
            <button onClick={() => setIsSelectingClass(true)}>x</button>
            <h3>Information page</h3>
          </div>
          <div className="student-sidebar-func-container">
            <button onClick={() => setIsSelectingClass(true)}>x</button>
            <h3>Review past exams</h3>
          </div>
        </div>
      </aside>
      {isSelectingClass && <StudentSelectClassModal></StudentSelectClassModal>}
    </>
  );
};

export default StudentHome;
