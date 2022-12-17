import React, { useState } from "react";
import { useGlobalContext } from "../../setup/Context";

const insertNewExamAssignment = async (
  phpHandler,
  idclass,
  idexam,
  examAssigns,
  setExamAssigns
) => {
  const url = phpHandler + `?insertNewExamAssign=${idclass}&idexam=${idexam}`;
  console.log(url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (data)
      setExamAssigns([...examAssigns, { id_class: idclass, id_exam: idexam }]);
    else throw new Error("Insert failed");
    window.location.reload(true);
  } catch (e) {
    alert("Insert failed (check for duplicates)");
  }
};

const AssignNewExam = ({
  listOfIDs,
  phpHandler,
  examAssigns,
  setExamAssigns,
  createdExams,
  setIsOpeningModal,
  isOpeningModal,
}) => {
  const { setIsDimmed } = useGlobalContext();
  const [selected, setSelected] = useState({ id_class: -1, id_exam: -1 });
  const handleAdd = () => {
    setIsDimmed(false);
    if (selected.id_class === -1 || selected.id_exam === -1) {
      alert(`You haven't selected which one to insert`);
      return;
    }
    insertNewExamAssignment(
      phpHandler,
      selected.id_class,
      selected.id_exam,
      examAssigns,
      setExamAssigns
    );
    setIsOpeningModal(false);
  };
  return (
    <div
      className={`${
        isOpeningModal
          ? "lec-exam-assign-new-modal"
          : "lec-exam-assign-new-modal isHidden"
      }`}
    >
      <div className="heading">
        <h1>Class ID</h1>
        <h1>Exam ID</h1>
      </div>
      <div className="class-list">
        {listOfIDs.map((n, index) => (
          <div
            className={`${
              n === selected.id_class ? "isSelected class" : "class"
            }`}
            key={index}
            onClick={() => {
              setSelected({ ...selected, id_class: n });
            }}
          >
            {n}
          </div>
        ))}
      </div>
      <div className="exam-list">
        {createdExams.map((n, index) => (
          <div
            className={`${
              n.examId === selected.id_exam ? "isSelected exam" : "exam"
            }`}
            key={index}
            onClick={() => setSelected({ ...selected, id_exam: n.examId })}
          >
            {n.examId}
          </div>
        ))}
      </div>
      <div className="assign-new-btn" onClick={() => handleAdd()}>
        <h1>Confirm</h1>
      </div>
    </div>
  );
};

export default AssignNewExam;
