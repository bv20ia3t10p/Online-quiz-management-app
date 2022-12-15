import React, { useState } from "react";

const insertNewExamAssignment = async (
  phpHandler,
  idclass,
  idexam,
  examAssigns,
  setExamAssigns
) => {
  const url = phpHandler + `?insertNewExamAssign=${idclass}&idexam=${idexam}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (data)
    setExamAssigns([...examAssigns, { id_class: idclass, id_exam: idexam }]);
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
  const [selected, setSelected] = useState({ id_class: 0, id_exam: 0 });
  const handleAdd = () => {
    if ((selected.id_class === selected.id_exam) === 0) {
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
      <div className="class-list">
        {listOfIDs.map((n, index) => (
          <div
            className="class"
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
            className="exam"
            key={index}
            onClick={() => setSelected({ ...selected, id_exam: n.ID })}
          >
            {n.ID}
          </div>
        ))}
      </div>
      <div className="assign-new-btn" onClick={() => handleAdd()}>
        Confirm
      </div>
    </div>
  );
};

export default AssignNewExam;
