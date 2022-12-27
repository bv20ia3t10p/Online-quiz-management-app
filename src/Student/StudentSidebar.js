import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
import ContactSupport from "../ContactSupport";

const checkPreviousEntrance = async (phpHandler, classID, stuID) => {
  const url =
    phpHandler + `?checkExamEntranceForStudent=${stuID}&idc=${classID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to check for entrance");
    return data;
  } catch (e) {
    alert(e);
  }
};

const StudentSidebar = () => {
  const {
    name,
    email,
    phone,
    currentClass,
    setIsSelectingClass,
    setIsTakingExam,
  } = useStudentContext();
  const { uid, isDimmed, phpHandler } = useGlobalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigateToExam = async () => {
    if (currentClass.ID_class) {
      const check = await checkPreviousEntrance(
        phpHandler,
        currentClass.ID_class,
        uid
      );
      console.log(check);
      if (check.entrance === "1") {
        alert("You can only attend an exam once per class");
        return;
      }
      setIsTakingExam(true);
      navigate("/Student/Exam");
    } else alert("Please first select a class");
  };
  return (
    <aside className={`${isDimmed ? "stu-sideBar dimmed" : "stu-sideBar"}`}>
      <ContactSupport name={name} email={email} />
      <div className="stu-sideBar-info">
        <div className="stu-sideBar-info-singlet">
          <AiOutlineUser className="ico" />
          <h3 className="text">Name</h3>
          <h3 className="value">{name}</h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineSmile className="ico" />
          <h3 className="text">ID</h3>
          <h3 className="value">{uid}</h3>{" "}
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineMail className="ico" />
          {/* <h3 className="text">Email</h3> */}
          <h3 className="value">{email}</h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlinePhone className="ico" />
          <h3 className="text">Phone</h3>
          <h3 className="value">{phone}</h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineContainer className="ico" />
          <h3 className="text">Class</h3>
          <h3 className="value">
            {currentClass.className ? currentClass.className : "Not selected"}
          </h3>
        </div>
        <div className="stu-sideBar-info-singlet">
          <AiOutlineDatabase className="ico" />
          <h3 className="text">C.ID</h3>
          <h3 className="value">
            {currentClass.ID_class ? currentClass.ID_class : "-"}
          </h3>
        </div>
      </div>
      <div className="stu-sideBar-function-select">
        <div
          onClick={() => {
            if (pathname === "/Student/Exam") {
              alert(`You can't do this during a test`);
              return;
            }
            setIsSelectingClass(true);
          }}
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
        <Link
          to={`/Student/Review/`}
          className="stu-sideBar-function-container"
        >
          {/* <AiOutlinePieChart className="ico" /> */}
          <h3 className="text">Review past exams</h3>
        </Link>
      </div>
    </aside>
  );
};

export default StudentSidebar;
