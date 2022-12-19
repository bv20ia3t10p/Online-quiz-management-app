import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";

/*
[{"questionID":"20001",
"content":"How many digits are there in Hindu-Arabic System?",
"opt1":"10",
"opt2":"20",
"opt3":"30",
"opt4":"40",
"correct":"1"}]
*/
const editQuestion = async (
  phpHandler,
  questionID,
  content,
  opt1,
  opt2,
  opt3,
  opt4,
  correct,
  created,
  setCreated
) => {
  const prep =
    phpHandler +
    `?updateQuestionCreatedByLecturer=${questionID}&content="${content}"&opt1="${opt1}"&opt2="${opt2}"&opt3="${opt3}"
    &opt4="${opt4}"&correct="${correct}"`;
  const url = encodeURI(prep);
  console.log(url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to edit question");
    setCreated(
      created.map((n) => {
        if (n.questionID === questionID)
          return { ...n, content, opt1, opt2, opt3, opt4, correct };
        return n;
      })
    );
  } catch (e) {
    alert(e);
  }
};
const LecQuestionEditModal = ({
  isEditing,
  setIsEditing,
  question,
  created,
  setCreated,
}) => {
  const { phpHandler } = useGlobalContext();
  const [newValues, setNewValues] = useState(question);
  const handleEdit = () => {
    setIsEditing(false);
    editQuestion(
      phpHandler,
      newValues.questionID,
      newValues.content,
      newValues.opt1,
      newValues.opt2,
      newValues.opt3,
      newValues.opt4,
      newValues.correct,
      created,
      setCreated
    );
  };
  useEffect(() => {
    setNewValues(question);
  }, [question]);
  return (
    <>
      {newValues && (
        <div
          className={`${
            isEditing
              ? "lec-question-edit-modal "
              : "lec-question-edit-modal isHidden"
          }`}
        >
          <div className="content">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              cols="84"
              rows="3"
              value={newValues.content}
              onChange={(e) => {
                setNewValues({ ...newValues, content: e.target.value });
              }}
            />
          </div>
          {["opt1", "opt2", "opt3", "opt4"].map((n, index) => {
            return (
              <div className={`${n}`} key={index}>
                <label htmlFor={`${n}`}>Option {index + 1}</label>
                <textarea
                  value={newValues[`${n}`]}
                  onChange={(e) => {
                    setNewValues({ ...newValues, [`${n}`]: e.target.value });
                  }}
                  id=""
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            );
          })}

          <div className="btns">
            <div className="btn" onClick={() => setIsEditing(false)}>
              Cancel
            </div>
            <div className="btn" onClick={handleEdit}>
              Confirm
            </div>
            <div className="correct">
              <label htmlFor="selectCorrect">Correct</label>
              <select
                value={newValues.correct}
                onChange={(e) =>
                  setNewValues({ ...newValues, correct: e.target.value })
                }
              >
                {[1, 2, 3, 4].map((n, index) => {
                  return (
                    <option key={index} value={n}>
                      {n}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LecQuestionEditModal;
