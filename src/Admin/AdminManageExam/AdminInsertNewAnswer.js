import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../setup/Context";
import { AiOutlineCheck } from "react-icons/ai";

const getQuestionsAssignedToExam = async (phpHandler, idExam, setQuestions) => {
  const url = phpHandler + `?getListOfAssignedQuestionsFor=${idExam}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get questions");
    setQuestions(data);
  } catch (e) {
    alert(e);
  }
};

const AdminInsertNewAnswer = ({
  idExam,
  isAddingAnswer,
  setIsAddingAnswer,
  answers,
  setAnswers,
}) => {
  const { phpHandler } = useGlobalContext();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selection, setSelection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useState(() => {
    if (isLoading) {
      getQuestionsAssignedToExam(phpHandler, idExam, setQuestions);
      setIsLoading(false);
    }
  });
  return (
    <div
      style={{ postion: "absolute" }}
      className={`${
        isAddingAnswer
          ? "admin-manage-exam-insert-new-answer"
          : "admin-manage-exam-insert-new-answer isHidden"
      }`}
    >
      <div className="admin-manage-exam-insert-new-answer-questions">
        <div className="admin-manage-exam-insert-new-answer-questions-title">
          Select a question from the list of questions assigned to this exam
        </div>
        <div className="admin-manage-exam-insert-new-answer-questions-headers">
          {[
            "ID",
            "Content",
            "Opt1",
            "Opt2",
            "Opt3",
            "Opt4",
            <AiOutlineCheck className="icon" />,
            "By",
          ].map((n, index) => {
            return (
              <span
                key={index}
                className="admin-manage-exam-insert-new-answer-questions-header"
              >
                {n}
              </span>
            );
          })}
        </div>
        <div className="admin-manage-exam-insert-new-answer-questions-list">
          {questions.map((n, index) => {
            <div
              key={index}
              className={`${
                index === selectedQuestion
                  ? "isSeleted admin-manage-exam-insert-new-answer-questions-list-single"
                  : "admin-manage-exam-insert-new-answer-questions-list-single"
              }`}
            >
              {Object.values(n).map((n2, index2) => {
                return (
                  <span
                    className="admin-manage-exam-isnert-new-answer-questions-list-single-value"
                    key={index2}
                  >
                    {n2}
                  </span>
                );
              })}
            </div>;
          })}
        </div>
        <input
          type="range"
          min={1}
          max={4}
          step={1}
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
          className="admin-manage-exam-insert-new-anwer-input"
        />
      </div>
    </div>
  );
};

export default AdminInsertNewAnswer;
