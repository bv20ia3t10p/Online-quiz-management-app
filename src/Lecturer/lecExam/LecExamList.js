import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";
import AssignNewExam from "./AssignNewExam";

const getListOfCreatedExams = async (uid, phpHandler, setCreatedExams) => {
  if (!uid) return;
  const url = phpHandler + `?getExamsCreatedBy=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setCreatedExams(data);
};

const getExamsForListOfClasses = async (idList, phpHandler, setExamAssigns) => {
  if (!idList) return;
  const listInString = idList.map((n, index) => {
    if (index === 0) return `(${n}`;
    else if (index === idList.length - 1) return `${n})`;
    else return `${n}`;
  });
  const url = phpHandler + `?getExamsListByClass=${listInString}`;
  const encoded = encodeURI(url);
  const resp = await fetch(encoded);
  const data = await resp.json();
  setExamAssigns(data);
};

const LecExamList = ({ phpHandler, classes }) => {
  const { uid, setIsDimmed } = useGlobalContext();
  const [examAssigns, setExamAssigns] = useState([]);
  const [createdExams, setCreatedExams] = useState([]);
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  const listOfIDs = classes.map((n) => n.classID);
  const handleAdd = () => {
    setIsDimmed(true);
    setIsOpeningModal(true);
  };
  useEffect(() => {
    if (listOfIDs)
      getExamsForListOfClasses(listOfIDs, phpHandler, setExamAssigns);
    if (uid) getListOfCreatedExams(uid, phpHandler, setCreatedExams);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="manage-exam">
      <div className="exam-assign-btns">
        <div className="exam-assign-btn" onClick={handleAdd}>
          Add
        </div>
        <div className="exam-assign-btn">Delete</div>
      </div>
      {examAssigns && (
        <div className="exam-assign-list">
          {examAssigns.map((n, index) => (
            <div key={index} className="exam-assign-item">
              {Object.values(n).map((n2, index2) => (
                <p className="value" key={index2}>
                  {n2}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="exam-manage-btns">
        <div className="exam-manage-btn">Add</div>
        <div className="exam-manage-btn">Edit</div>
        <div className="exam-manage-btn">Delete</div>
      </div>
      {typeof createdExams && (
        <div className="created-exam-list">
          {createdExams.map((n, index) => (
            <div key={index} className="created-exam">
              <h1>{n.ID}</h1>
              <h2>{n.name}</h2>
            </div>
          ))}
        </div>
      )}
      <AssignNewExam
        phpHandler={phpHandler}
        setExamAssigns={setExamAssigns}
        listOfIDs={listOfIDs}
        examAssigns={examAssigns}
        createdExams={createdExams}
        setIsOpeningModal={setIsOpeningModal}
        isOpeningModal={isOpeningModal}
      />
    </div>
  );
};
export default LecExamList;
