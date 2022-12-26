import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";
import { handleSearch } from "./AdminManageExamActions";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";

const fetchListOfStudent = async (phpHandler, setStudents) => {
  const url = phpHandler + `?getAllStudents`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get list of students");
    setStudents({ students: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

const fetchListOfClassesForStudent = async (
  phpHandler,
  setClassesForStudent,
  idStudent
) => {
  if (!idStudent) return;
  const url = phpHandler + `?getClass=${idStudent}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get classes for student");
    setClassesForStudent({ classes: data, backUp: data });
    if (!data.length)
      throw new Error("This student hasnt been enrolled in any class");
  } catch (e) {
    alert(e);
  }
};

const fetchAssignedExamsForClass = async (phpHandler, setExams, idClass) => {
  if (!idClass) return;
  const url = phpHandler + `?getAssignedExamsForClass=${idClass}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get exams for class");
    if (!data.length) throw new Error("There is no exam for this class");
    setExams({ exams: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

const insertNewExam = async (phpHandler, idStudent, idClass, idExam) => {
  if (!idStudent || !idClass || !idExam) {
    alert("Not enough information, check selected fields");
    return;
  }
  const url =
    phpHandler +
    `?newStudentExam&idStu=${idStudent}&idClass=${idClass}&idExam=${idExam}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to insert a new exam");
    alert("Inserted successfully");
  } catch (e) {
    alert(e);
    return null;
  }
};

const InsertNewExamModal = ({ isInsertingExam, setIsInsertingExam }) => {
  const [students, setStudents] = useState({ students: [], backUp: [] });
  const [searchStudent, setSearchStudent] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [classesForStudent, setClassesForStudent] = useState({
    classes: [],
    backUp: [],
  });
  const [searchClassForStudent, setSearchClassForStudent] = useState("");
  const [selectedClassForStudent, setSelectedClassForStudent] = useState(0);
  const [exams, setExams] = useState({ exams: [], backUp: [] });
  const [searchExam, setSearchExam] = useState("");
  const [selectedExam, setSelectedExam] = useState(0);
  const { phpHandler } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      fetchListOfStudent(phpHandler, setStudents);
    }
    if (students) setIsLoading(false);
  }, [isLoading, phpHandler, students]);
  useEffect(() => {
    if (isLoading) return;
    if (!students.students[selectedStudent]) return;
    fetchListOfClassesForStudent(
      phpHandler,
      setClassesForStudent,
      students.students[selectedStudent].id
    );
  }, [isLoading, students.students, selectedStudent, phpHandler]);
  useEffect(() => {
    if (isLoading) return;
    if (!classesForStudent.classes[selectedClassForStudent]) return;
    fetchAssignedExamsForClass(
      phpHandler,
      setExams,
      classesForStudent.classes[selectedClassForStudent].ID_class
    );
  }, [
    isLoading,
    classesForStudent.classes,
    selectedClassForStudent,
    phpHandler,
  ]);
  const checkIndex = (a) => (a > 2 ? 0 : a < 0 ? 2 : a);
  if (!isLoading)
    return (
      <div
        className={`${
          isInsertingExam
            ? "admin-manage-insert-new-exam"
            : "admin-manage-insert-new-exam isHidden"
        }`}
      >
        <div
          className={`${
            0 === currentPage
              ? "isActive admin-manage-insert-new-exam-student"
              : `${
                  currentPage === 2
                    ? "isRight admin-manage-insert-new-exam-student"
                    : "isLeft admin-manage-insert-new-exam-student"
                }`
          }`}
        >
          <span className="admin-manage-insert-new-exam-student-title">
            Select a student
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(students, searchStudent, setStudents);
            }}
            className="admin-manage-insert-new-exam-student-search"
          >
            <input
              type="text"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="admin-manage-insert-new-exam-student-search-input"
            />
            <button
              type="submit"
              className="admin-manage-insert-new-exam-student-search-btn"
            >
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-manage-insert-new-exam-student-headers">
            {["ID", "Name"].map((n, index) => {
              return (
                <span
                  key={index}
                  className="admin-manage-insert-new-exam-student-header"
                >
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-manage-insert-new-exam-student-list">
            {students.students.map((n, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    selectedStudent === index
                      ? "admin-manage-insert-new-exam-student-list-single isSelected"
                      : "admin-manage-insert-new-exam-student-list-single"
                  }`}
                  onClick={() => setSelectedStudent(index)}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        className="admin-manage-insert-new-exam-student-list-single-value"
                        key={index2}
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
        {students.students[selectedStudent] &&
          classesForStudent.classes[selectedClassForStudent] && (
            <div
              className={`${
                currentPage === 1
                  ? "isActive admin-manage-insert-new-exam-class"
                  : `${
                      currentPage > 1
                        ? "isLeft admin-manage-insert-new-exam-class"
                        : "isRight admin-manage-insert-new-exam-class"
                    }`
              }`}
            >
              <span className="admin-manage-insert-new-exam-class-title">
                List of enrolled classes for{" "}
                {students.students[selectedStudent].id}
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(
                    classesForStudent,
                    searchClassForStudent,
                    setClassesForStudent
                  );
                }}
                className="admin-manage-insert-new-exam-class-search"
              >
                <input
                  type="text"
                  value={searchClassForStudent}
                  onChange={(e) => setSearchClassForStudent(e.target.value)}
                  className="admin-manage-insert-new-exam-class-search-input"
                />
                <button
                  type="submit"
                  className="admin-manage-insert-new-exam-class-search-button"
                >
                  <AiOutlineSearch className="icon" />
                </button>
              </form>
              <div className="admin-manage-insert-new-exam-class-headers">
                {
                  /* {select e.ID_class as ID_class,c.name as className,
    l.name as lecturerName,s.name as subjectName,s.description } */
                  ["C.ID", "Class", "Lecturer", "Subject", "S.Description"].map(
                    (n, index) => {
                      return (
                        <span
                          className="admin-manage-insert-new-exam-class-header"
                          key={index}
                        >
                          {n}
                        </span>
                      );
                    }
                  )
                }
              </div>
              <div className="admin-manage-insert-new-exam-class-list">
                {classesForStudent.classes.map((n, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedClassForStudent(index)}
                      className={`${
                        index === selectedClassForStudent
                          ? "isSelected admin-manage-insert-new-exam-class-list-single"
                          : "admin-manage-insert-new-exam-class-list-single"
                      }`}
                    >
                      {Object.values(n).map((n2, index2) => {
                        return (
                          <span
                            key={index2}
                            className="admin-manage-insert-new-exam-class-list-single-value"
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
        {students.students[selectedStudent] &&
          classesForStudent.classes[selectedClassForStudent] &&
          exams.exams[selectedExam] && (
            <div
              className={`${
                currentPage === 2
                  ? "isActive admin-manage-insert-new-exam-exam"
                  : `${
                      currentPage < 2
                        ? "isRight admin-manage-insert-new-exam-exam"
                        : "isLeft admin-manage-inser-new-exam-exam"
                    }`
              }`}
            >
              <span className="admin-manage-insert-new-exam-exam-title">
                List of exams for class{" "}
                {typeof classesForStudent.classes[selectedClassForStudent]
                  .className
                  ? classesForStudent.classes[selectedClassForStudent].className
                  : "Not selected"}
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(exams, searchExam, setExams);
                }}
                className="admin-manage-insert-new-exam-exam-search"
              >
                <input
                  type="text"
                  value={searchExam}
                  onChange={(e) => setSearchExam(e.target.value)}
                  className="admin-manage-insert-new-exam-exam-search-input"
                />
                <button
                  type="submit"
                  className="admin-manage-insert-new-exam-exam-search-btn"
                >
                  <AiOutlineSearch className="icon" />
                </button>
              </form>
              <div className="admin-manage-insert-new-exam-exam-headers">
                {["ID", "Name", "By", "Creator name"].map((n, index) => {
                  return (
                    <span
                      className="admin-manage-insert-new-exam-exam-header"
                      key={index}
                    >
                      {n}
                    </span>
                  );
                })}
              </div>
              <div className="admin-manage-insert-new-exam-exam-list">
                {exams.exams.map((n, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        index === selectedExam
                          ? "isSelected admin-manage-insert-new-exam-exam-list-single"
                          : "admin-manage-insert-new-exam-exam-list-single"
                      }`}
                      onClick={() => setSelectedExam(index)}
                    >
                      {Object.values(n).map((n2, index2) => {
                        return (
                          <span
                            key={index2}
                            className="admin-manage-insert-new-exam-exam-list-single-value"
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
        <div className="admin-manage-insert-new-exam-btns">
          <span
            className="admin-manage-insert-new-exam-navigation-back"
            onClick={() => setCurrentPage(checkIndex(currentPage - 1))}
          >
            <AiOutlineLeft className="icon" />
          </span>
          <span
            className="admin-manage-insert-new-exam-navigation-forward"
            onClick={() => setCurrentPage(checkIndex(currentPage + 1))}
          >
            <AiOutlineRight className="icon" />
          </span>
          <span
            className="admin-manage-insert-new-exam-btn"
            onClick={() => setIsInsertingExam(false)}
          >
            Cancel
          </span>
          <span
            className="admin-manage-insert-new-exam-btn"
            onClick={() => {
              if (
                insertNewExam(
                  phpHandler,
                  students.students[selectedStudent].id,
                  classesForStudent.classes[selectedClassForStudent].ID_class,
                  exams.exams[selectedExam].id
                )
              )
                setIsInsertingExam(false);
            }}
          >
            Confirm
          </span>
        </div>
      </div>
    );
  return <h1>Loading</h1>;
};

export default InsertNewExamModal;
