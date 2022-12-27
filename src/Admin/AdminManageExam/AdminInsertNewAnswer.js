import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../setup/Context";
import { AiOutlineCheck } from "react-icons/ai";
import { insertData } from "../../Student/stuExam/handleSubmit";

const getQuestionsAssignedToExam = async (phpHandler, idExam, setQuestions) => {
  if (!idExam) return;
  const url = phpHandler + `?getListOfAssignedQuestionsFor=${idExam}`;
  console.log(url);
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
  idStudent,
  idClass,
  idStudentExam,
}) => {
  const { phpHandler } = useGlobalContext();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selection, setSelection] = useState(1);
  const handleAdd = () => {
    insertData(
      idExam,
      questions[selectedQuestion].id,
      selection,
      phpHandler,
      idStudent,
      idClass,
      idStudentExam
    );
    console.log("ok");
    setIsAddingAnswer(false);
    setAnswers({
      stuAnswers: [
        ...answers.stuAnswers,
        {
          id: questions[selectedQuestion].id,
          content: questions[selectedQuestion].content,
          selection: selection,
          answer: questions[selectedQuestion][`opt${selection}`],
        },
      ],
      backUp: [
        ...answers.backUp,
        {
          id: questions[selectedQuestion].id,
          content: questions[selectedQuestion].content,
          selection: selection,
          answer: questions[selectedQuestion][`opt${selection}`],
        },
      ],
    });
  };
  useEffect(() => {
    getQuestionsAssignedToExam(phpHandler, idExam, setQuestions);
  }, [phpHandler, idExam]);
  return (
    <div
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
            return (
              <div
                onClick={() => setSelectedQuestion(index)}
                key={index}
                className={`${
                  index === selectedQuestion
                    ? "isSelected admin-manage-exam-insert-new-answer-questions-list-single"
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
              </div>
            );
          })}
        </div>
      </div>
      <div className="admin-manage-exam-insert-new-answer-btns">
        <label>Selection</label>
        <input
          type="number"
          min={1}
          max={4}
          step={1}
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
          className="admin-manage-exam-insert-new-anwer-input"
        />
        <span
          className="admin-manage-exam-insert-new-answer-btn"
          onClick={() => setIsAddingAnswer(false)}
        >
          Cancel
        </span>
        <span
          className="admin-manage-exam-insert-new-answer-btn"
          onClick={() => handleAdd()}
        >
          Confirm
        </span>
      </div>
    </div>
  );
};

export default AdminInsertNewAnswer;
