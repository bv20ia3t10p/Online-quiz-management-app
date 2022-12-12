import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../setup/Context";
import { useStudentContext } from "./studentContext";
import {
  AiOutlineContainer,
  AiOutlineDatabase,
  AiOutlineMail,
  // AiOutlineMonitor,
  // AiOutlineOrderedList,
  AiOutlinePhone,
  // AiOutlinePieChart,
  // AiOutlinePlayCircle,
  AiOutlineSmile,
  AiOutlineUser,
} from "react-icons/ai";

const StudentSidebar = () => {
  const {
    name,
    email,
    phone,
    currentClass,
    setIsSelectingClass,
    setIsTakingExam,
    isDimmed,
  } = useStudentContext();
  const { uid } = useGlobalContext();
  const navigate = useNavigate();
  const navigateToExam = () => {
    if (currentClass.ID_class) {
      setIsTakingExam(true);
      navigate("/Student/Exam");
    } else alert("Please first select a class");
  };
  return (
    <aside className={`${isDimmed ? "stu-sideBar dimmed" : "stu-sideBar"}`}>
      <div className="stu-sideBar-info">
        <div className="stu-sideBar-info-singlet">
          <AiOutlineUser className="ico" />
          <h3 className="text">Student name:</h3>
          <h3 className="value">{name}</h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineSmile className="ico" />
          <h3 className="text">Student ID:</h3>
          <h3 className="value">{uid}</h3>{" "}
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineMail className="ico" />
          <h3 className="text">Email:</h3>
          <h3 className="value">{email}</h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlinePhone className="ico" />
          <h3 className="text">Phone number:</h3>
          <h3 className="value">{phone}</h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineContainer className="ico" />
          <h3 className="text">Current class:</h3>
          <h3 className="value">
            {currentClass.className ? currentClass.className : "Not selected"}
          </h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineDatabase className="ico" />
          <h3 className="text">Class ID:</h3>
          <h3 className="value">
            {currentClass.ID_class ? currentClass.ID_class : "-"}
          </h3>
        </div>
      </div>
      <div className="stu-sideBar-function-select">
        <div
          onClick={() => setIsSelectingClass(true)}
          className="stu-sideBar-function-container"
        >
          {/* <AiOutlineOrderedList className="ico" /> */}
          <h3 className="text">Select class</h3>
        </div>
        <div
          onClick={() => navigateToExam()}
          className="stu-sideBar-function-container"
        >
          {/* <AiOutlinePlayCircle className="ico" /> */}
          <h3 className="text">Take Exam</h3>
        </div>
        <Link
          to={`/Student/About/${uid}`}
          className="stu-sideBar-function-container"
        >
          {/* <AiOutlineMonitor className="ico" /> */}
          <h3 className="text">Information page</h3>
        </Link>
        <div
          onClick={() => setIsSelectingClass(true)}
          className="stu-sideBar-function-container"
        >
          {/* <AiOutlinePieChart className="ico" /> */}
          <h3 className="text">Review past exams</h3>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;
