import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
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
import InsertNewExamModal from "./InsertNewExamModal";

const AdminManageExam = () => {
  const [isInsertingExam, setIsInsertingExam] = useState(false);
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
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [selectedChange, setSelectedChange] = useState(0);
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
    <>
      <InsertNewExamModal
        isInsertingExam={isInsertingExam}
        setIsInsertingExam={setIsInsertingExam}
      />
      <div className="admin-manage-exam">
        <div className="admin-manage-exam-exam">
          <span className="admin-manage-exam-exam-title">
            List of student exams
          </span>
          <div
            className="admin-manage-exam-exam-buttons"
            onClick={() => editStudentExams(phpHandler)}
          >
            <span
              onClick={() => setIsInsertingExam(true)}
              className="admin-manage-exam-exam-button"
            >
              <AiOutlinePlus className="icon" />
            </span>
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
            <button
              type="submit"
              className="admin-manage-exam-exam-search-icon"
            >
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-manage-exam-exam-header">
            {["ID", "S.ID", "Student", "C.ID", "Class", "ID.E", "Score"].map(
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
                <div
                  onClick={() => setSelected(index)}
                  key={index}
                  className={`${
                    index === selected
                      ? "admin-manage-exam-list-single isSelected"
                      : "admin-manage-exam-list-single"
                  }`}
                >
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
        <div className="admin-manage-exam-answers">
          <span className="admin-manage-exam-answers-title">
            List of answers for current exam
          </span>
          <div className="admin-manage-exam-answers-btns">
            <span className="admin-manage-exam-answers-btn">
              <AiOutlinePlus className="icon" />
            </span>
            <span
              className="admin-manage-exam-answers-btn"
              onClick={() =>
                editAnswer(phpHandler, "Edit", {
                  idStudentAnswer: answers.stuAnswers[selectedAnswer],
                })
              }
            >
              <AiOutlineEdit className="icon" />
            </span>
            <span
              className="admin-manage-exam-answers-btn"
              onClick={() =>
                editAnswer(phpHandler, "Delete", {
                  idStudentAnswer: answers.stuAnswers[selectedAnswer],
                })
              }
            >
              <AiOutlineDelete className="icon" />
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(answers, searchStudentAnswer, setAnswers);
            }}
            className="admin-manage-exam-answers-search"
          >
            <input
              type="text"
              value={searchStudentAnswer}
              onChange={(e) => {
                setSearchStudentAnswer(e.target.value);
              }}
              className="admin-manage-exam-answers-search-input"
            />
            <button
              type="submit"
              className="admin-manage-exam-answers-search-btn"
            >
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-manage-exam-answers-headers">
            {["ID", "Question", "Selection", "Answer"].map((n, index) => {
              return (
                <span className="admin-manage-exam-answers-header" key={index}>
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-manage-exam-answers-list">
            {answers.stuAnswers.map((n, index) => {
              return (
                <div
                  className={`${
                    index === selectedAnswer
                      ? "admin-manage-exam-answers-list-single isSelected"
                      : "admin-manage-exam-answers-list-single"
                  }`}
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        key={index2}
                        className="admin-manage-exam-answers-list-single-value"
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
        <div className="admin-manage-exam-changeLog">
          <span className="admin-manage-exam-changeLog-title">
            Score changelog for current exam
          </span>
          <div className="admin-manage-exam-changeLog-btns">
            <span
              className="admin-manage-exam-changeLog-btn"
              onClick={() =>
                editScoreChangeLog(phpHandler, {
                  type: "Edit",
                  payload: {
                    id: scoreChangeLog.changeLog[selectedChange]
                      .id_score_adjustment,
                  },
                })
              }
            >
              <AiOutlineEdit className="icon" />
            </span>
            <span className="admin-manage-exam-changeLog-btn">
              <AiOutlineDelete
                className="icon"
                onClick={() =>
                  editScoreChangeLog(phpHandler, {
                    type: "Delete",
                    payload: {
                      idScoreChangeLog:
                        scoreChangeLog.changeLog[selectedChange]
                          .id_score_adjustment,
                    },
                  })
                }
              />
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(
                scoreChangeLog,
                searchScoreChangeLog,
                setScoreChangeLog
              );
            }}
            className="admin-manage-exam-changeLog-search"
          >
            <input
              type="text"
              value={searchScoreChangeLog}
              onChange={(e) => setSearchScoreChangeLog(e.target.value)}
              className="admin-manage-exam-changeLog-search-inp"
            />
            <button
              type="submit"
              className="admin-manage-exam-changeLog-search-btn"
            >
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-manage-exam-changeLog-headers">
            {["ID", "Score", "Reason", "By"].map((n, index) => {
              return (
                <span
                  className="admin-manage-exam-changeLog-header"
                  key={index}
                >
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-manage-exam-changeLog-list">
            {scoreChangeLog.changeLog.map((n, index) => {
              return (
                <div
                  className={`${
                    index === selectedChange
                      ? "admin-manage-exam-changeLog-list-single isSelected"
                      : "admin-manage-exam-changeLog-list-single"
                  }`}
                  key={index}
                  onClick={() => setSelectedChange(index)}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        className="admin-manage-exam-changeLog-list-single-value"
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
    </>
  );
};

export default AdminManageExam;
