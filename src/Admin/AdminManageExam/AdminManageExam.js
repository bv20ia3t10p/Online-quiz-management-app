import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  getAllStudentExams,
  editStudentExams,
  editAnswer,
  getAnswersByExam,
  getScoreChangeLog,
  handleSearch,
  editScoreChangeLog,
} from "./AdminManageExamActions";

const AdminManageExam = () => {
  const { phpHandler, uid } = useGlobalContext();
  const [studentExams, setStudentExams] = useState({
    stuExams: [],
    backUp: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState({ stuAnswers: [], backUp: [] });
  const [selected, setSelected] = useState(0);
  const [scoreChangeLog, setScoreChangeLog] = useState({
    changeLog: [],
    backUp: [],
  });
  const [searchStudentExams, setSearchStudentExams] = useState("");
  const [searchScoreChangeLog, setSearchScoreChangeLog] = useState("");
  const [searchStudentAnswer, setSearchStudentAnswer] = useState("");
  useEffect(() => {
    if (isLoading) {
      getAllStudentExams(phpHandler, setStudentExams);
      setIsLoading(false);
    }
  }, [isLoading, phpHandler]);
  useEffect(() => {
    console.log("StuExams:", studentExams.stuExams[selected]);
    if (!studentExams.stuExams[selected]) return;
    getAnswersByExam(
      phpHandler,
      studentExams.stuExams[selected].id_student_exam,
      setAnswers
    );
    getScoreChangeLog(
      phpHandler,
      studentExams.stuExams[selected].id_student_exam,
      setScoreChangeLog
    );
  }, [selected, studentExams.stuExams, phpHandler]);
  return (
    <div className="admin-manage-exam">
      <div className="admin-manage-exam-exam">
        <span className="admin-manage-exam-exam-title">
          List of student exams
        </span>
        <div
          className="admin-manage-exam-exam-buttons"
          onClick={() => editStudentExams(phpHandler)}
        >
          <span className="admin-manage-exam-exam-button">
            <AiOutlineEdit
              className="icon"
              onClick={() => {
                editStudentExams(phpHandler, "Edit", {
                  id_student_exam:
                    studentExams.stuExams[selected].id_student_exam,
                  idAdmin: uid,
                });
              }}
            />
          </span>
          <span
            className="admin-manage-exam-exam-button"
            onClick={() =>
              editStudentExams(phpHandler, "Delete", {
                id_student_exam:
                  studentExams.stuExams[selected].id_student_exam,
              })
            }
          >
            <AiOutlineDelete className="icon" />
          </span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(studentExams, searchStudentExams, setStudentExams);
          }}
          className="admin-manage-exam-exam-search"
        >
          <input
            type="text"
            value={searchStudentExams}
            onChange={(e) => setSearchStudentExams(e.target.value)}
            className="admin-manage-exam-exam-search-input"
          />
          <button type="submit" className="admin-manage-exam-exam-search-icon">
            <AiOutlineSearch className="icon" />
          </button>
        </form>
        <div className="admin-manage-exam-exam-header">
          {["ID", "S.ID", "Student", "C.ID", "Class", "Score"].map(
            (n, index) => {
              return (
                <span
                  className="admin-manage-exam-exam-header-single"
                  key={index}
                >
                  {n}
                </span>
              );
            }
          )}
        </div>
        <div className="admin-manage-exam-list">
          {studentExams.stuExams.map((n, index) => {
            return (
              <div key={index} className="admin-manage-exam-list-single">
                {Object.values(n).map((n2, index2) => {
                  return (
                    <span
                      className="admin-manage-exam-list-single-value"
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
    </div>
  );
};

export default AdminManageExam;
