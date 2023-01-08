import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineCheck,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
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
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get available questions");
    else setAssignedQuestions(data);
  } catch (e) {
    alert(e);
  }
};

const deleteQuestionsFromExam = async (
  questions,
  setQuestions,
  assignedQuestions,
  setAssignedQuestions,
  selectedAssign,
  setBackUp,
  idExam,
  phpHandler
) => {
  const url =
    phpHandler +
    `?deleteQuestionFromExam=${idExam}&questionToDelete=${assignedQuestions[selectedAssign].id}`;
  try {
    const conf = window.confirm('Are you sure to delete?');
    // if (!conf) return;
    if (!conf) throw new Error('Delete canceled');
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to delete this question from the exam");
    else {
      const newAssigned = assignedQuestions.filter(
        (n, index) => index !== selectedAssign
      );
      const newQuestions = [...questions, assignedQuestions[selectedAssign]];
      setAssignedQuestions(newAssigned);
      setQuestions(newQuestions);
      setBackUp({
        isBackedUp: true,
        assignedQuestions: newAssigned,
        questions: newQuestions,
      });
    }
  } catch (e) {
    alert(e);
  }
};

const assignNewQuestions = async (
  questions,
  setQuestions,
  assignedQuestions,
  setAssignedQuestions,
  selectedAvailable,
  setBackUp,
  idExam,
  phpHandler
) => {
  const url =
    phpHandler +
    `?assignNewQuestionToExam=${idExam}&questionToAssign=${questions[selectedAvailable].id}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to assign this question to the exam");
    else {
      const newAssigned = [...assignedQuestions, questions[selectedAvailable]];
      const newQuestions = questions.filter(
        (n, index) => index !== selectedAvailable
      );
      setAssignedQuestions(newAssigned);
      setQuestions(newQuestions);
      setBackUp({
        isBackedUp: true,
        assignedQuestions: newAssigned,
        questions: newQuestions,
      });
    }
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
  const [searchAvailable, setSearchAvailable] = useState("");
  const [backUp, setBackUp] = useState({
    isBackedUp: false,
    questions: [],
    assignedQuestions: [],
  });
  const [selectedAssign, setSelectedAssign] = useState(-1);
  const [selectedAvailable, setSelectedAvailable] = useState(-1);
  const handleSearchAssign = (e) => {
    e.preventDefault();
    if (!backUp.isBackedUp)
      setBackUp({ isBackedUp: true, questions, assignedQuestions });
    const newAssigned = [];
    if (!searchAssigned) {
      setAssignedQuestions(backUp.assignedQuestions);
      return;
    } else if (!backUp.isBackedUp) {
      alert("Enter a search parameter first");
      return;
    }
    assignedQuestions.forEach((n) => {
      if (
        Object.values(n).find((n2) =>
          n2.toString().toUpperCase().includes(searchAssigned.toUpperCase())
        )
      )
        newAssigned.push(n);
    });
    setAssignedQuestions(newAssigned);
  };
  const handleSearchAvailable = (e) => {
    e.preventDefault();
    if (!backUp.isBackedUp) {
      if (!searchAvailable) {
        alert("Enter a search parameter first");
        return;
      }
      setBackUp({ isBackedUp: true, questions, assignedQuestions });
    }
    if (!searchAvailable) {
      setQuestions(backUp.questions);
      return;
    }
    const newQuestions = [];
    questions.forEach((n) => {
      if (
        Object.values(n).find((n2) =>
          n2.toString().toUpperCase().includes(searchAvailable.toUpperCase())
        )
      )
        newQuestions.push(n);
    });
    setQuestions(newQuestions);
  };
  const handleAdd = () => {
    setSelectedAvailable(-1);
    setSelectedAssign(-1);
    assignNewQuestions(
      questions,
      setQuestions,
      assignedQuestions,
      setAssignedQuestions,
      selectedAvailable,
      setBackUp,
      idExam,
      phpHandler
    );
  };
  const handleDelete = () => {
    setSelectedAvailable(-1);
    setSelectedAssign(-1);
    deleteQuestionsFromExam(
      questions,
      setQuestions,
      assignedQuestions,
      setAssignedQuestions,
      selectedAssign,
      setBackUp,
      idExam,
      phpHandler
    );
  };
  useEffect(() => {
    getListOfQuestions(phpHandler, idExam, setQuestions);
    getListOfAssignedQuestions(phpHandler, idExam, setAssignedQuestions);
  }, [idExam, phpHandler, setQuestions, setAssignedQuestions]);
  return (
    <div className="lec-exam-content-edit">
      <div className="lec-exam-content-edit-container">
        <h1 className="lec-exam-content-list-title">
          List of questions assigned to exam {idExam}
        </h1>
        <form
          className="lec-exam-content-edit-search"
          onSubmit={handleSearchAssign}
        >
          <input
            type="Leave blank to get all results back"
            className="lec-exam-content-edit-search-input"
            value={searchAssigned}
            onChange={(e) => setSearchAssigned(e.target.value)}
            placeholder="Leave blank to get all results"
          />
          <button type="submit" className="lec-exam-content-edit-search-sub">
            <AiOutlineSearch />
          </button>
        </form>
        <div className="lec-exam-content-list">
          <div className="lec-exam-content-list-heading">
            <h1>ID</h1>
            <h1>Question</h1>
            <h1>A</h1>
            <h1>B</h1>
            <h1>C</h1>
            <h1>D</h1>
            <AiOutlineCheck className="icon" />
            <h1>By</h1>
          </div>
          <div className="lec-exam-content-list-values">
            {assignedQuestions.map((n, index) => {
              return (
                <div
                  className={`${index === selectedAssign
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
      <div className="lec-exam-content-edit-btns">
        <div className="lec-exam-content-edits-btn-delete">
          <AiOutlineArrowRight onClick={handleDelete} />
        </div>
        <div className="lec-exam-content-edits-btn-add">
          <AiOutlineArrowLeft onClick={handleAdd} />
        </div>
      </div>
      <div className="lec-exam-content-edit-container">
        <h1 className="lec-exam-content-list-title">
          List of questions of the same subject that are available
        </h1>
        <form
          className="lec-exam-content-edit-search"
          onSubmit={handleSearchAvailable}
        >
          <input
            type="Leave blank to get all results back"
            className="lec-exam-content-edit-search-input"
            value={searchAvailable}
            onChange={(e) => setSearchAvailable(e.target.value)}
            placeholder="Leave blank to get all results"
          />
          <button type="submit" className="lec-exam-content-edit-search-sub">
            <AiOutlineSearch />
          </button>
        </form>
        <div className="lec-exam-content-list">
          <div className="lec-exam-content-list-heading">
            <h1>ID</h1>
            <h1>Question</h1>
            <h1>A</h1>
            <h1>B</h1>
            <h1>C</h1>
            <h1>D</h1>
            <AiOutlineCheck className="icon" />
            <h1>By</h1>
          </div>
          <div className="lec-exam-content-list-values">
            {questions.map((n, index) => {
              return (
                <div
                  className={`${index === selectedAvailable
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
