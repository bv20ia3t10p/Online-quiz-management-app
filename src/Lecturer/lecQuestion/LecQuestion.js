import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import { useGlobalContext } from "../../setup/Context";
import { useLecContext } from "../LecContext";
import LecQuestionEditModal from "./LecQuestionEditModal";

const getAvailableQuestionsInDb = async (
  phpHandler,
  setAvailable,
  idSubject,
  lecID
) => {
  const url =
    phpHandler +
    `?getAvailableQuestionsInDbForSubject=${idSubject}&lecID=${lecID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get questions of the same subject");
    setAvailable(data);
  } catch (e) {
    alert(e);
  }
};

const getQuestionsCreatedBy = async (
  phpHandler,
  setCreated,
  idSubject,
  lecID
) => {
  const url =
    phpHandler +
    `?getCreatedQuestionsInDbForSubject=${idSubject}&lecID=${lecID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get questions of the same subject");
    setCreated(data);
  } catch (e) {
    alert(e);
  }
};

const deleteCreatedQuestions = async (
  phpHandler,
  questionID,
  created,
  setCreated
) => {
  const url = phpHandler + `?deleteQuestionCreatedByLecturer=${questionID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to delete question");
    setCreated(created.filter((n) => n.questionID !== questionID));
  } catch (e) {
    alert(e);
  }
};

const addNewQuestionToDB = async (
  phpHandler,
  content,
  opt1,
  opt2,
  opt3,
  opt4,
  correct,
  idSubject,
  idLecturer,
  created,
  setCreated
) => {
  const prep =
    phpHandler +
    `?addNewQuestionCreatedByLec="${content}"&opt1="${opt1}"&opt2="${opt2}"&opt3="${opt3}"&opt4="${opt4}"&correct=${correct}&idSubject=${idSubject}&idLecturer=${idLecturer}`;
  const url = encodeURI(prep);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to delete question");
    setCreated([...created, { content, opt1, opt2, opt3, opt4, correct }]);
  } catch (e) {
    alert(e);
  }
};
/*{"classID":"3004",
  "className":"IT001.HTCL.M11",
  "subject":"Introduction to Programming",
  "classAvg":null,
  "subjectID":"1004",
  "examNumbers":"0"}*/
const LecQuestion = () => {
  const { phpHandler } = useGlobalContext();
  const { id, classes } = useLecContext();
  const [created, setCreated] = useState([]);
  const [available, setAvailable] = useState([]);
  const [backUp, setBackUp] = useState({
    isBackedUp: false,
    created: [],
    available: [],
  });
  const [selected, setSelected] = useState(-1);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchCreated, setSearchCreated] = useState("");
  const [currentSubject, setCurrentSubject] = useState({});
  const listSubjects = classes.map((n) => {
    return {
      subjectID: n.subjectID,
      subjectName: n.subjectName,
      description: n.subject,
    };
  });
  const [newQuestion, setNewQuestion] = useState({
    content: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    correct: 0,
  });
  useEffect(() => {
    if (currentSubject.subjectID || !classes[0]) return;
    else {
      setCurrentSubject({
        subjectID: classes[0].subjectID,
        subjectName: classes[0].subjectName,
        description: classes[0].subject,
      });
    }
  }, [currentSubject.subjectID, classes]);
  useEffect(() => {
    if (!currentSubject.subjectID) return;
    getAvailableQuestionsInDb(
      phpHandler,
      setAvailable,
      currentSubject.subjectID,
      id
    );
    getQuestionsCreatedBy(phpHandler, setCreated, currentSubject.subjectID, id);
  }, [currentSubject, id, phpHandler]);
  const [isEditing, setIsEditing] = useState(false);
  const handleSearchAvailable = (e) => {
    e.preventDefault();
    if (!searchAvailable && !backUp.isBackedUp) return;
    if (!backUp.isBackedUp) {
      setBackUp({ isBackedUp: true, created, available });
    }
    if (!searchAvailable) {
      setAvailable(backUp.available);
    } else {
      const newAvailable = [];
      available.forEach((n) => {
        if (
          Object.values(n).find((n2) =>
            n2.toUpperCase().includes(searchAvailable.toUpperCase())
          )
        )
          newAvailable.push(n);
      });
      setAvailable(newAvailable);
    }
  };
  const handleSearchCreated = (e) => {
    e.preventDefault();
    if (!searchCreated && !backUp.isBackedUp) return;
    if (!backUp.isBackedUp) {
      setBackUp({ isBackedUp: true, created, available });
    }
    if (!searchCreated) {
      setCreated(backUp.created);
    } else {
      const newCreated = [];
      created.forEach((n) => {
        if (
          Object.values(n).find((n2) =>
            n2.toUpperCase().includes(searchCreated.toUpperCase())
          )
        )
          newCreated.push(n);
      });
      setCreated(newCreated);
    }
  };
  const handleChangeSubject = (e) => {
    if (!e.target.value) return;
    else
      setCurrentSubject(
        listSubjects.find((n) => n.subjectID === e.target.value)
      );
    e.target.setSelected(0);
  };
  const handleDelete = () => {
    deleteCreatedQuestions(
      phpHandler,
      created[selected].questionID,
      created,
      setCreated
    );
  };
  const handleAddQuestion = (e) => {
    e.preventDefault();
    addNewQuestionToDB(
      phpHandler,
      newQuestion.content,
      newQuestion.opt1,
      newQuestion.opt2,
      newQuestion.opt3,
      newQuestion.opt4,
      newQuestion.correct,
      currentSubject.subjectID,
      id,
      created,
      setCreated
    );
  };
  return (
    <>
      {created[0] && (
        <LecQuestionEditModal
          question={created[selected]}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          created={created}
          setCreated={setCreated}
        />
      )}
      <div className="lec-question-manage">
        <div className="lec-question-manage-subject">
          <select
            className="lec-question-manage-subject-dropdown"
            defaultValue={""}
            onChange={handleChangeSubject}
            id="selectSub"
          >
            <option value="">--Change subject--</option>
            {listSubjects.map((n, index) => {
              return (
                <option value={n.subjectID} key={index}>
                  {n.subjectName} - {n.description}
                </option>
              );
            })}
          </select>
          <div className="lec-question-manage-subject-description">
            <span className="lec-question-manage-subject-description-description">
              {currentSubject.description}
            </span>
          </div>
        </div>
        <div className="lec-question-manage-created-btns">
          <span
            className="lec-question-manage-created-edit"
            onClick={() => setIsEditing(true)}
          >
            <AiOutlineEdit className="icon" />
          </span>
          <span
            className="lec-question-manage-created-remove"
            onClick={handleDelete}
          >
            <AiOutlineDelete className="icon" />
          </span>
        </div>
        <div className="lec-question-manage-created">
          <form
            className="lec-question-manage-created-search"
            onSubmit={handleSearchCreated}
          >
            <input
              type="text"
              value={searchCreated}
              onChange={(e) => setSearchCreated(e.target.value)}
              placeholder="Created questions, leave blank to get all results back"
              id="searchCreated"
            />
            <button type="submit">
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="lec-question-manage-created-heading">
            <span>ID</span>
            <span>Content</span>
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>
              <AiOutlineCheck className="icon" />
            </span>
          </div>
          <div className="lec-question-manage-created-list">
            {created.map((n, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index === selected
                      ? "lec-question-manage-created-singlet isSelected"
                      : "lec-question-manage-created-singlet"
                  }`}
                  onClick={() => setSelected(index)}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        key={index2}
                        className="lec-question-manage-created-singlet-value"
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
        <div className="lec-question-manage-available">
          <form
            className="lec-question-manage-available-search"
            onSubmit={handleSearchAvailable}
          >
            <input
              type="text"
              id="searchAvailable"
              value={searchAvailable}
              placeholder="Questions created by others, leave blank to get all results back"
              onChange={(e) => setSearchAvailable(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="lec-question-manage-available-heading">
            {[
              "ID",
              "Content",
              "A",
              "B",
              "C",
              "D",
              <AiOutlineCheck className="icon" />,
              "By",
            ].map((n, index) => (
              <span key={index}>{n}</span>
            ))}
          </div>
          <div className="lec-question-manage-available-list">
            {available.map((n, index) => {
              return (
                <div
                  key={index}
                  className="lec-question-manage-available-singlet"
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        key={index2}
                        className="lec-question-manage-available-value"
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
        <form
          className="lec-question-manage-create"
          onSubmit={handleAddQuestion}
        >
          <textarea
            value={newQuestion.content}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, content: e.target.value })
            }
            className="lec-question-manage-create-content"
            placeholder="Question to be asked.
          Double click an option to make it the correct one 
          (This can be changed later in the top right panel)"
          />
          <div
            className={`${
              newQuestion.correct === 1
                ? "lec-question-manage-create-option isCorrect"
                : "lec-question-manage-create-option"
            }`}
          >
            <textarea
              className="lec-question-manage-create-option-input"
              value={newQuestion.opt1}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, opt1: e.target.value })
              }
              placeholder="Option 1"
              onDoubleClick={() =>
                setNewQuestion({ ...newQuestion, correct: 1 })
              }
            />
          </div>
          <div className="lec-question-manage-create-option">
            <textarea
              className={`${
                newQuestion.correct === 2
                  ? "lec-question-manage-create-option isCorrect"
                  : "lec-question-manage-create-option"
              }`}
              value={newQuestion.opt2}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, opt2: e.target.value })
              }
              placeholder="Option 2"
              onDoubleClick={() =>
                setNewQuestion({ ...newQuestion, correct: 2 })
              }
            />
          </div>
          <div className="lec-question-manage-create-option">
            <textarea
              className={`${
                newQuestion.correct === 3
                  ? "lec-question-manage-create-option isCorrect"
                  : "lec-question-manage-create-option"
              }`}
              value={newQuestion.opt3}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, opt3: e.target.value })
              }
              placeholder="Option 3"
              onDoubleClick={() =>
                setNewQuestion({ ...newQuestion, correct: 3 })
              }
            />
          </div>
          <div className="lec-question-manage-create-option">
            <textarea
              className={`${
                newQuestion.correct === 4
                  ? "lec-question-manage-create-option isCorrect"
                  : "lec-question-manage-create-option"
              }`}
              value={newQuestion.opt4}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, opt4: e.target.value })
              }
              placeholder="Option 4"
              onDoubleClick={() =>
                setNewQuestion({ ...newQuestion, correct: 4 })
              }
            />
          </div>
          <button type="submit" className="lec-question-manage-create-submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default LecQuestion;
