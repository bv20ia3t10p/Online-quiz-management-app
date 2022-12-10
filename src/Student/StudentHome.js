import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../setup/Context";
import { useStudentContext } from "./studentContext";
import StudentSelectClassModal from "./StudentSelectClassModal";
import {
  AiOutlineContainer,
  AiOutlineDatabase,
  AiOutlineMail,
  AiOutlineMonitor,
  AiOutlineOrderedList,
  AiOutlinePhone,
  AiOutlinePieChart,
  AiOutlinePlayCircle,
  AiOutlineSmile,
  AiOutlineUser,
} from "react-icons/ai";

const StudentHome = () => {
  const {
    name,
    email,
    phone,
    currentClass,
    isSelectingClass,
    setIsSelectingClass,
    setIsTakingExam,
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
    <>
      <aside className="student-sidebar col-start-1 col-end-3 bg-amber-200 h-full p-1">
        <div className="stu-sidebar-info w-fit pr-1 grid grid-cols-[10% 30% 60%] grid-rows-[repeat(6,auto-fill)] gap-x-1 w-40 items-center">
          <AiOutlineUser className="col-start-1 col-end-1" />
          <h3 className="col-start-2 col-end-2 flex-wrap w-20 text-left">
            Student name:
          </h3>
          <h3 className="row-start-1 row-end-1 col-start-3 col-end-3 flex-wrap w-20 text-center">
            {name}
          </h3>
          <AiOutlineSmile className="col-start-1 col-end-1" />
          <h3 className="col-start-2 col-end-2 flex-wrap w-20 text-left">
            Student ID:
          </h3>
          <h3 className="row-start-2 row-end-2 col-start-3 col-end-3 flex-wrap w-20 text-center">
            {uid}
          </h3>
          <AiOutlineMail className="col-start-1 col-end-1" />
          <h3 className="col-start-2 col-end-2 flex-wrap w-20 text-left">
            Email:
          </h3>
          <h3
            style={{ wordWrap: "break-word" }}
            className="row-start-3 row-end-3 col-start-3 col-end-3 flex-wrap w-20 text-center"
          >
            {email}
          </h3>
          <AiOutlinePhone className="col-start-1 col-end-1" />
          <h3 className="col-start-2 col-end-2 flex-wrap w-20 text-left">
            Phone number:
          </h3>
          <h3 className="row-start-4 row-end-4 col-start-3 col-end-3 flex-wrap w-20 text-center">
            {phone}
          </h3>
          <AiOutlineContainer className="col-start-1 col-end-1" />
          <h3 className="col-start-2 col-end-2 flex-wrap w-20 text-left">
            Current class:
          </h3>
          <h3
            style={{ wordWrap: "break-word" }}
            className="row-start-5 row-end-5 col-start-3 col-end-3 flex-wrap w-20 text-center"
          >
            {currentClass.className ? currentClass.className : "Not selected"}
          </h3>
          <AiOutlineDatabase className="col-start-1 col-end-1" />
          <h3 className="col-start-2 col-end-2 flex-wrap w-20 text-left">
            Class ID:
          </h3>
          <h3 className="row-start-6 row-end-6 col-start-3 col-end-3 flex-wrap w-20 text-center">
            {currentClass.ID_class ? currentClass.ID_class : "-"}
          </h3>
        </div>
        <div className="student-function-select grid grid-rows-[repeat(4,auto-fill)]">
          <div
            onClick={() => setIsSelectingClass(true)}
            className="student-sidebar-func-container grid grid-cols-[20%,1fr] text-center items-center"
          >
            <button>
              <AiOutlineOrderedList />
            </button>
            <h3>Select class</h3>
          </div>
          <div
            onClick={() => navigateToExam()}
            className="student-sidebar-func-container grid grid-cols-[10%,1fr] text-center items-center"
          >
            <button>
              <AiOutlinePlayCircle />
            </button>
            <h3>Take Exam</h3>
          </div>
          <div
            onClick={() => setIsSelectingClass(true)}
            className="student-sidebar-func-container grid grid-cols-[10%,1fr] text-center items-center"
          >
            <button>
              <AiOutlineMonitor />
            </button>
            <h3>Information page</h3>
          </div>
          <div
            onClick={() => setIsSelectingClass(true)}
            className="student-sidebar-func-container grid grid-cols-[10%,1fr] text-center items-center"
          >
            <button>
              <AiOutlinePieChart />
            </button>
            <h3>Review past exams</h3>
          </div>
        </div>
      </aside>
      <main>
        {isSelectingClass && (
          <StudentSelectClassModal></StudentSelectClassModal>
        )}
      </main>
    </>
  );
};

export default StudentHome;
