import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../setup/Context";

const getListOfQuestions = async (phpHandler, idExam, setQuestions) => {
  const url = phpHandler + `?getListOfQuestionsFor=${idExam}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get available questions");
    else setQuestions(data);
  } catch (e) {
    alert(e);
  }
};

const getListOfAssignedQuestions = async (
  phpHandler,
  idExam,
  setAssignedQuestions
) => {
  const url = phpHandler + `?getListOfAssignedQuestionsFor=${idExam}`;
  console.log(url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get available questions");
    else setAssignedQuestions(data);
  } catch (e) {
    alert(e);
  }
};

const ExamContent = () => {
  const { phpHandler } = useGlobalContext();
  const [questions, setQuestions] = useState([]);
  const [assignedQuestions, setAssignedQuestions] = useState([]);
  const idExam = useParams("eid").eid;
  const [searchAssigned, setSearchAssigned] = useState("");
  const [backUp, setBackUp] = useState({
    isBackedUp: false,
    questions: [],
    assignedQuestions: [],
  });
  const [selectedAssign, setSelectedAssign] = useState(-1);
  const [selectedAvailable, setSelectedAvailable] = useState(-1);
  useEffect(() => {
    getListOfQuestions(phpHandler, idExam, setQuestions);
    getListOfAssignedQuestions(phpHandler, idExam, setAssignedQuestions);
  }, [idExam, phpHandler, setQuestions, setAssignedQuestions]);
  return (
    <div className="lec-exam-content-edit">
      <div className="lec-exam-content-edit-container">
        <form className="lec-exam-content-edit-search">
          <input
            type="Leave blank to get all results back"
            className="lec-exam-content-edit-search-input"
            value={searchAssigned}
            onChange={(e) => setSearchAssigned(e.target.value)}
          />
          <button type="submit" className="lec-exam-content-edit-search-sub">
            <AiOutlineSearch />
          </button>
        </form>
        <div className="lec-exam-content-list">
          <h1 className="lec-exam-content-list-title">
            List of questions assigned to exam {idExam}
          </h1>
          <div className="lec-exam-content-list-heading">
            <h1>ID</h1>
            <h1>Question</h1>
            <h1>Option 1</h1>
            <h1>Option 2</h1>
            <h1>Option 3</h1>
            <h1>Option 4</h1>
            <h1>Correct answer</h1>
            <h1>Created by</h1>
          </div>
          <div className="lec-exam-content-list-values">
            {assignedQuestions.map((n, index) => {
              return (
                <div
                  className={`${
                    index === selectedAssign
                      ? "lec-exam-content-list-value isSelected"
                      : "lec-exam-content-list-value"
                  }`}
                  key={index}
                  onClick={() => setSelectedAssign(index)}
                >
                  {Object.values(n).map((n2, index2) => (
                    <h1
                      key={index2}
                      className="lec-exam-content-list-value-singe"
                    >
                      {n2}
                    </h1>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lec-exam-content-edit-container">
        <form className="lec-exam-content-edit-search">
          <input
            type="Leave blank to get all results back"
            className="lec-exam-content-edit-search-input"
            value={searchAssigned}
            onChange={(e) => setSearchAssigned(e.target.value)}
          />
          <button type="submit" className="lec-exam-content-edit-search-sub">
            <AiOutlineSearch />
          </button>
        </form>
        <div className="lec-exam-content-list">
          <h1 className="lec-exam-content-list-title">
            List of questions of the same subject that are available
          </h1>
          <div className="lec-exam-content-list-heading">
            <h1>ID</h1>
            <h1>Question</h1>
            <h1>Option 1</h1>
            <h1>Option 2</h1>
            <h1>Option 3</h1>
            <h1>Option 4</h1>
            <h1>Correct answer</h1>
            <h1>Created by</h1>
          </div>
          <div className="lec-exam-content-list-values">
            {questions.map((n, index) => {
              return (
                <div
                  className={`${
                    index === selectedAvailable
                      ? "lec-exam-content-list-value isSelected"
                      : "lec-exam-content-list-value"
                  }`}
                  key={index}
                  onClick={() => setSelectedAvailable(index)}
                >
                  {Object.values(n).map((n2, index2) => (
                    <h1
                      key={index2}
                      className="lec-exam-content-list-value-singe"
                    >
                      {n2}
                    </h1>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamContent;
