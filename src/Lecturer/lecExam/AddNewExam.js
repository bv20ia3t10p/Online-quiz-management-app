import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";

const loadListOfSubjects = async (phpHandler, setSubjects) => {
  const url = phpHandler + `?getAllSubjects`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get list of subjects");
    setSubjects(data);
  } catch (e) {
    alert(e);
  }
};

const insertNewExam = async (phpHandler, name, subject, uid) => {
  const prep =
    phpHandler +
    `?insertNewExam=${name}&idsubject=${subject}&created_by=${uid}`;
  const url = encodeURI(prep);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Insert failed");
    window.location.reload(true);
  } catch (e) {
    alert(e);
  }
};

const AddNewExam = ({ isAddingNewExam, setIsAddingNewExam }) => {
  const [subjects, setSubjects] = useState([]);
  const { phpHandler, uid } = useGlobalContext();
  const [examName, setExamName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(-1);
  useEffect(() => {
    if (!subjects.length) loadListOfSubjects(phpHandler, setSubjects);
  }, [subjects.length, phpHandler]);
  const closeModal = () => {
    setIsAddingNewExam(false);
  };
  const handleAdd = () => {
    closeModal();
    insertNewExam(phpHandler, examName, subjects[selectedSubject].ID, uid);
  };
  return (
    <div
      className={`${
        isAddingNewExam
          ? "lec-add-new-exam-modal"
          : "lec-add-new-exam-modal isHidden"
      }`}
    >
      <div className="close-btn" onClick={() => closeModal()}>
        <h1>Close</h1>
      </div>
      <h1>Fill in exam information to add</h1>
      <h2>Name for the new exam:</h2>
      <input
        type="text"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
      />
      <h2>Select a subject from the subject list</h2>
      <h3>Subject list</h3>
      <div className="add-subjects">
        <div className="add-headings">
          <h1>ID</h1>
          <h1>Name</h1>
          <h1>Description</h1>
        </div>
        {subjects.map((n, index) => (
          <div
            key={index}
            className={`${
              index === selectedSubject
                ? "add-subject isSelected"
                : "add-subject"
            }`}
            onClick={() => setSelectedSubject(index)}
          >
            {Object.values(n).map((n2, index2) => {
              return <p key={index2}>{n2}</p>;
            })}
          </div>
        ))}
      </div>
      <div className="add-btn-confirm" onClick={() => handleAdd()}>
        <h1>Confirm</h1>
      </div>
    </div>
  );
};

export default AddNewExam;
