import React, { useState, useEffect } from "react";
import { useLecContext } from "./LecContext";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useGlobalContext } from "../setup/Context";

const getScoresForClass = async (phpHandler, setList, idClass) => {
  const url = phpHandler + `?getScoreForClass=${idClass}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data)
      throw new Error(
        `Can't get list of scores for current class or class is empty`
      );
    setList(data);
  } catch (e) {
    alert(e);
  }
};

const getStudentExamAnswers = async (
  phpHandler,
  setListAnswer,
  id_student_exam
) => {
  const url = phpHandler + `?getStudentExamAnswersFor=${id_student_exam}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get history for current exam");
    setListAnswer(data);
  } catch (e) {
    alert(e);
  }
};

const getStudentExamScoreAdjustmentHistory = async (
  phpHandler,
  setHistory,
  id_student_exam
) => {
  const url = phpHandler + `?getStudentExamAdjustHistoryFor=${id_student_exam}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get change history for current exam");
    setHistory(data);
  } catch (e) {
    alert(e);
  }
};

const adjustExamScoreFor = async (
  phpHandler,
  id_student_exam,
  newValues = { score: 0, reason: "Not identified" },
  id
) => {
  const prep =
    phpHandler +
    `?adjustExamScoreFor=${id_student_exam}&newScore=${newValues.score}&reason=${newValues.reason}&by=${id}`;
  const url = encodeURI(prep);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to adjust score");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};
/*{"classID":"3001",
"className":"IT004.HTCL.M11",
"subject":"Fundamentals of Database Systems",
"classAvg":null,
"subjectID":"1001",
"examNumbers":"0",
"subjectName":"IT004"}*/
const LecStudentManage = () => {
  const { phpHandler } = useGlobalContext();
  const [list, setList] = useState([]);
  const { id, classes } = useLecContext();
  const [selected, setSelected] = useState(0);
  const [searchAnswer, setSearchAnswer] = useState("");
  const [currentClass, setCurrentClass] = useState();
  const [searchStudentExam, setSearchStudentExam] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [backUp, setBackUp] = useState({ isBackedUp: false, list: [] });
  const [listAnswerBackUp, setListAnswerBackUp] = useState({
    isBackedUp: false,
    listAnswer: [],
  });
  const [newValues, setNewValues] = useState({ score: 0, reason: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) return;
    try {
      getScoresForClass(phpHandler, setList, currentClass.classID);
    } catch (e) {
      alert(e);
    }
  }, [classes, currentClass, isLoading, setList, setCurrentClass, phpHandler]);
  useEffect(() => {
    if (isLoading) return;
    if (!typeof currentClass.classID) setCurrentClass({ ...classes[0] });
  }, [classes, currentClass, isLoading]);
  useEffect(() => {
    if (isLoading) return;
    if (!list[selected]) return;
    getStudentExamAnswers(
      phpHandler,
      setListAnswer,
      list[selected].id_student_exam
    );
    getStudentExamScoreAdjustmentHistory(
      phpHandler,
      setHistory,
      list[selected].id_student_exam
    );
  }, [selected, list, isLoading, phpHandler]);
  useEffect(() => {
    if (!isLoading) return;
    if (classes.length && typeof list[selected]) {
      setCurrentClass({ ...classes[0] });
      setIsLoading(false);
    } else return;
  }, [isLoading, classes, list, selected, currentClass]);
  const handleSearchStudentExam = (e) => {
    e.preventDefault();
    if (!backUp.isBackedUp) {
      setBackUp({ isBackedUp: true, list });
      if (!searchStudentExam) {
        alert("Enter search value first!");
        return;
      }
    }
    if (!searchStudentExam) {
      setList(backUp.list);
    } else {
      const newList = [];
      list.forEach((n) => {
        if (
          Object.values(n).find((n2) =>
            n2.toUpperCase().includes(searchStudentExam.toUpperCase())
          )
        )
          newList.push(n);
      });
      if (!newList.length) {
        alert('No result found');
        return;
      }
      setList(newList);
    }
  };
  const handleSearchAnswer = (e) => {
    e.preventDefault();
    if (!listAnswerBackUp.isBackedUp) {
      setListAnswerBackUp({ isBackedUp: true, listAnswer });
      if (!searchAnswer) {
        alert("Enter search value first!");
        return;
      }
    }
    if (!searchAnswer) {
      setListAnswer(listAnswerBackUp.listAnswer);
    } else {
      const newListAnswer = [];
      listAnswer.forEach((n) => {
        if (
          Object.values(n).find((n2) =>
            n2.toUpperCase().includes(searchAnswer.toUpperCase())
          )
        )
          newListAnswer.push(n);
      });
      if (!newListAnswer.length) {
        alert('No result found');
        return;
      }
      setListAnswer(newListAnswer);
    }
  };
  const handleAdjust = () => {
    if (newValues.reason === "" && newValues.score === 0) {
      alert("Please enter the desired value");
      return;
    }
    adjustExamScoreFor(
      phpHandler,
      list[selected].id_student_exam,
      newValues,
      id
    );
    setIsEditing(false);
  };
  if (!isLoading)
    return (
      <>
        <div
          className={`${isEditing
              ? "lec-student-adjust-score-modal"
              : "lec-student-adjust-score-modal isHidden"
            }`}
        >
          <label htmlFor="lec-student-score-adjust-score">New score</label>
          <input
            type="text"
            value={newValues.score}
            onChange={(e) =>
              setNewValues({ ...newValues, score: e.target.value })
            }
            id="lec-student-score-adjust-score"
          />
          <label htmlFor="lec-student-score-adjust-reason">Reason</label>
          <input
            type="text"
            id="lec-student-score-adjust-reason"
            value={newValues.reason}
            onChange={(e) =>
              setNewValues({ ...newValues, reason: e.target.value })
            }
          />
          <div className="lec-student-score-adjust-btns">
            <button onClick={handleAdjust}>Confirm</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
        <div className="lec-student-manage">
          <div className="lec-student-manage-current-class">
            <select
              className="lec-student-manage-current-class-dropdown"
              onChange={(e) =>
                setCurrentClass(
                  classes.find((n) => n.classID === e.target.value)
                )
              }
            >
              {classes.map((n, index) => {
                return (
                  <option
                    key={index}
                    value={`${n.classID}`}
                  >{`${n.className}`}</option>
                );
              })}
            </select>
            <span className="lec-student-manage-current-class-header">
              {currentClass.className}
            </span>
            <span className="lec-student-manage-current-class-subHeader">
              {currentClass.subjectName} - {currentClass.subject}
            </span>
          </div>
          <div className="lec-student-manage-edit">
            <AiOutlineEdit
              className="icon"
              onClick={() => setIsEditing(true)}
            />
          </div>
          <div className="lec-student-manage-list">
            <div className="lec-student-manage-list-title">
              <h1>List of student exams in class {currentClass.className}</h1>
            </div>
            <form
              onSubmit={handleSearchStudentExam}
              className="lec-student-manage-list-search"
            >
              <input
                type="text"
                onChange={(e) => setSearchStudentExam(e.target.value)}
                placeholder="Leave blank to get all results"
                value={searchStudentExam}
                className="lec-student-manage-list-search-inp"
              />
              <button
                type="submit"
                className="lec-student-manage-list-search-btn"
              >
                <AiOutlineSearch className="icon" />
              </button>
            </form>
            <div className="lec-student-manage-list-heading">
              {[
                "Submission",
                "Student ID",
                "Name",
                "Exam ID",
                "E.Name",
                "Score",
              ].map((n, index) => {
                return <span key={index}>{n}</span>;
              })}
            </div>
            <div className="lec-student-manage-list-values">
              {list.map((n, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`${index === selected
                        ? "lec-student-manage-list-single isSelected"
                        : "lec-student-manage-list-single"
                      }`}
                  >
                    {Object.values(n).map((n2, index2) => {
                      return (
                        <span className="value" key={index2}>
                          {n2}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lec-student-manage-answer-list">
            <span className="lec-student-manage-answer-list-title">
              Student submitted answer for current exam
            </span>
            <form
              onSubmit={handleSearchAnswer}
              className="lec-student-manage-answer-list-search"
            >
              <input
                type="text"
                value={searchAnswer}
                onChange={(e) => setSearchAnswer(e.target.value)}
                className="lec-student-manage-answer-list-search-inp"
              />
              <button
                type="submit"
                className="lec-student-manage-answer-list-search-btn"
              >
                <AiOutlineSearch />
              </button>
            </form>
            <div className="lec-student-manage-answer-list-heading">
              {["ID", "Question", "Selected", "Answer"].map((n, index) => {
                return (
                  <span
                    key={index}
                    className="lec-student-manage-answer-list-value"
                  >
                    {n}
                  </span>
                );
              })}
            </div>
            <div className="lec-student-manage-answer-list-values">
              {listAnswer.map((n, index) => {
                return (
                  <div
                    key={index}
                    className="lec-student-manage-answer-list-singlet"
                  >
                    {Object.values(n).map((n2, index2) => {
                      return (
                        <span
                          key={index2}
                          className="lec-student-manage-answer-list-value"
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
          <div className="lec-student-manage-history">
            <span className="lec-student-manage-history-title">
              Score adjustment history for current exam
            </span>
            <div className="lec-student-manage-history-heading">
              {["ID", "Score", "Reason", "By"].map((n, index) => {
                return (
                  <span
                    className="lec-student-manage-history-heading-single"
                    key={index}
                  >
                    {n}
                  </span>
                );
              })}
            </div>
            <div className="lec-student-manage-history-values">
              {history.map((n, index) => {
                return (
                  <div
                    className="lec-student-manage-history-single"
                    key={index}
                  >
                    {Object.values(n).map((n2, index2) => {
                      return (
                        <span
                          key={index2}
                          className="lec-student-manage-history-value"
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
  return <div className="">Loading</div>;
};

export default LecStudentManage;
