import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../setup/Context";
import {
  fetchAllClasses,
  fetchStudentsInClass,
  fetchStudentsNotInClass,
  enrollStudent,
  unEnrollStudent,
  editLecturer,
  deleteClassFromSystem,
} from "./adminManageClassActions";
import { handleSearch } from "../Admin/AdminManageExam/AdminManageExamActions";
import {
  AiOutlineDelete,
  AiOutlineDown,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUp,
} from "react-icons/ai";
import InsertClassModal from "./InsertClassModal";

const AdminManageClass = () => {
  const [classes, setClasses] = useState({ classes: [], backUp: [] });
  const [students, setStudents] = useState({ students: [], backUp: [] });
  const [studentsNotIn, setStudentsNotIn] = useState({
    students: [],
    backUp: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(0);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [selectedNotInStudent, setSelectedNotInStudent] = useState(0);
  const [searchClass, setSearchClass] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [searchStudentsNotIn, setSearchStudentNotIn] = useState("");
  const { phpHandler } = useGlobalContext();
  useEffect(() => {
    if (isLoading) {
      fetchAllClasses(phpHandler, setClasses);
      setIsLoading(false);
    }
  }, [phpHandler, setClasses, isLoading]);
  useEffect(() => {
    if (!classes.classes) return;
    if (!classes.classes[selectedClass]) return;
    fetchStudentsInClass(
      phpHandler,
      classes.classes[selectedClass].classID,
      setStudents
    );
    fetchStudentsNotInClass(
      phpHandler,
      classes.classes[selectedClass].classID,
      setStudentsNotIn
    );
  }, [classes.classes, selectedClass, phpHandler]);
  if (!isLoading)
    return (
      <div className="admin-class">
        <div className="admin-class-class">
          <InsertClassModal
            isAddingClass={isAddingClass}
            setIsAddingClass={setIsAddingClass}
          />
          <div className="admin-class-class-btns">
            <button
              className="admin-class-class-btn"
              onClick={() => setIsAddingClass(true)}
            >
              <AiOutlinePlus className="icon" />
            </button>
            <button
              className="admin-class-class-btn"
              onClick={() => {
                editLecturer(
                  phpHandler,
                  classes.classes[selectedClass].classID
                );
              }}
            >
              <AiOutlineEdit className="icon" />
            </button>
            <button
              className="admin-class-class-btn"
              onClick={() =>
                deleteClassFromSystem(
                  phpHandler,
                  classes.classes[selectedClass].classID
                )
              }
            >
              <AiOutlineDelete className="icon" />
            </button>
          </div>
          <span className="admin-class-class-title">List of classes</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(classes, searchClass, setClasses);
            }}
            className="admin-class-class-search"
          >
            <input
              type="text"
              value={searchClass}
              onChange={(e) => setSearchClass(e.target.value)}
              className="admin-class-class-search-input"
            />
            <button type="submit" className="admin-class-class-search-btn">
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-class-class-headers">
            {[
              "C.ID",
              "Class",
              "L.ID",
              "Lecturer",
              "S.ID",
              "S.Name",
              "Subject",
            ].map((n, index) => {
              return (
                <span key={index} className="admin-class-class-header">
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-class-class-list">
            {classes.classes.map((n, index) => {
              return (
                <div
                  onClick={() => setSelectedClass(index)}
                  key={index}
                  className={`${
                    index === selectedClass
                      ? "isSelected admin-class-class-list-single"
                      : "admin-class-class-list-single"
                  }`}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        key={index2}
                        className="admin-class-class-list-single-value"
                      >
                        {n2}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {classes.classes[selectedClass] && (
          <div className="admin-class-enrolled">
            <span className="admin-class-enrolled-title">
              List of enrolled students for class{" "}
              {classes.classes[selectedClass].classID}
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(students, searchStudent, setStudents);
              }}
              className="admin-class-enrolled-search"
            >
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="admin-class-enrolled-search-input"
              />
              <button type="submit" className="admin-class-enrolled-search-btn">
                <AiOutlineSearch className="icon" />
              </button>
            </form>
            <div className="admin-class-enrolled-headers">
              {["ID", "Name", "Phone", "Email"].map((n, index) => {
                return (
                  <span key={index} className="admin-class-enrolled-header">
                    {n}
                  </span>
                );
              })}
            </div>
            <div className="admin-class-enrolled-list">
              {students.students.map((n, index) => {
                return (
                  <div
                    onClick={() => setSelectedStudent(index)}
                    key={index}
                    className={`${
                      index === selectedStudent
                        ? "isSelected admin-class-enrolled-list-single"
                        : "admin-class-enrolled-list-single"
                    }`}
                  >
                    {Object.values(n).map((n2, index2) => {
                      return (
                        <span
                          key={index2}
                          className="admin-class-enrolled-list-single-value"
                        >
                          {n2}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="admin-class-btn">
          <button
            className="admin-class-add"
            onClick={() =>
              enrollStudent(
                phpHandler,
                selectedNotInStudent,
                classes.classes[selectedClass].classID,
                students,
                setStudents,
                studentsNotIn,
                setStudentsNotIn
              )
            }
          >
            <AiOutlineUp className="icon" />
          </button>
          <button
            className="admin-class-remove"
            onClick={() => {
              unEnrollStudent(
                phpHandler,
                selectedStudent,
                classes.classes[selectedClass].classID,
                students,
                setStudents,
                studentsNotIn,
                setStudentsNotIn
              );
            }}
          >
            <AiOutlineDown className="icon" />
          </button>
        </div>
        {classes.classes[selectedClass] && (
          <div className="admin-class-notIn">
            <span className="admin-class-notIn-title">
              List of students not enrolled in selected class
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(
                  studentsNotIn,
                  searchStudentsNotIn,
                  setStudentsNotIn
                );
              }}
              className="admin-class-notIn-search"
            >
              <input
                type="text"
                value={searchStudentsNotIn}
                onChange={(e) => setSearchStudentNotIn(e.target.value)}
                className="admin-class-notIn-search-input"
              />
              <button type="submit" className="admin-class-notIn-search-btn">
                <AiOutlineSearch className="icon" />
              </button>
            </form>
            <div className="admin-class-notIn-headers">
              {["ID", "Name", "Phone", "Email"].map((n, index) => {
                return (
                  <span key={index} className="admin-class-enrolled-header">
                    {n}
                  </span>
                );
              })}
            </div>
            <div className="admin-class-notIn-list">
              {studentsNotIn.students.map((n, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedNotInStudent(index)}
                    className={`${
                      index === selectedNotInStudent
                        ? "isSelected admin-class-notIn-list-single"
                        : "admin-class-notIn-list-single"
                    }`}
                  >
                    {Object.values(n).map((n2, index2) => {
                      return (
                        <span
                          key={index2}
                          className="admin-class-notIn-list-single-value"
                        >
                          {n2}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  return <div className="">Loading</div>;
};

export default AdminManageClass;
