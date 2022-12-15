import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";

const fetchAssignedQuestions = async (
  phpHandler,
  idExam,
  setAssignedQuestion
) => {
  const url = phpHandler + `?getAssignedQuestiosnFor=${idExam}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setAssignedQuestion(data);
};

const fetchAvailableQuestions = async (
  phpHandler,
  idSubject,
  setAvailableQuestions
) => {
  const url = phpHandler + `?getAvailbleQuestionsFor=${idSubject}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setAvailableQuestions(data);
};

const EditExam = ({ idExam, idSubject, isOpeningExamContent }) => {
  const { phpHandler } = useGlobalContext();
  const [assignedQuestions, setAssignedQuestion] = useState([]);
  const [availableQuetions, setAvailableQuestions] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState(-1);
  const [selectedAvailable, setSelectedAvailable] = useState(-1);
  useEffect(() => {
    if (!idExam || !idSubject) return;
    fetchAssignedQuestions(phpHandler, idExam, setAssignedQuestion);
    fetchAvailableQuestions(phpHandler, idSubject, setAvailableQuestions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      className={`${
        isOpeningExamContent
          ? "lec-edit-exam-modal"
          : "lec-edit-exam-modal isHidden"
      }`}
    >
      <div className="lec-edit-exam-modal-btn">Add</div>
      <div className="lec-edit-exam-modal-assigned-list">
        {assignedQuestions.map((n, index) => (
          <div
            key={index}
            className="lec-edit-exam-modal-assigned"
            onClick={() => setSelectedAssigned(index)}
          >
            <h1>{n}</h1>
          </div>
        ))}
      </div>
      <div className="lec-edit-exam-modal-available-list">
        {setAvailableQuestions.map((n, index) => (
          <div
            className="lec-edit-exam-modal-available"
            key={index}
            onClick={() => setSelectedAvailable(index)}
          >
            <h1>{n}</h1>
          </div>
        ))}
      </div>
      <div className="lec-edit-exam-modal-btn">Delete</div>
    </div>
  );
};

export default EditExam;
