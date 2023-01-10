import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";
import AssignNewExam from "./AssignNewExam";
import { AiOutlineBulb, AiOutlineSearch } from "react-icons/ai";
import AddNewExam from "./AddNewExam";
import { useNavigate } from "react-router-dom";

const getListOfCreatedExams = async (uid, phpHandler, setCreatedExams) => {
  if (!uid) return;
  const url = phpHandler + `?getExamsCreatedBy=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setCreatedExams(data);
};

const getExamsForListOfClasses = async (uid, phpHandler, setExamAssigns) => {
  if (!uid) return;
  const url = phpHandler + `?getExamsListByClass=${uid}`;
  const encoded = encodeURI(url);
  const resp = await fetch(encoded);
  const data = await resp.json();
  setExamAssigns(data);
};

const deleteExamAssign = async (
  phpHandler,
  idClass,
  idExam,
  // setExamAssigns,
  examAssigns,
  // setBackUp,
  // backUp
) => {
  const url = phpHandler + `?deleteExamAssign=${idClass}&idexam=${idExam}`;
  try {
    const conf = window.confirm('Are you sure to delete?');
    // if (!conf) return;
    if (!conf) throw new Error('Delete canceled');
    const resp = await fetch(url);
    const data = await resp.json();
    if (data) {
      // const newAssigns = examAssigns.filter(
      //   (n) => n.classID !== idClass && n.id_exam !== idExam
      // );
      // setExamAssigns(newAssigns);
      // setBackUp({ ...backUp, examAssigns: newAssigns });
      alert('Delete successfully');
      window.location.reload();
    } else throw new Error("Delete failed");
  } catch (e) {
    alert(e);
  }
};

const deleteCreatedExams = async (
  phpHandler,
  idExam,
  setCreatedExams,
  createdExams,
  setBackUp,
  backUp
) => {
  const url = phpHandler + `?deleteCreatedExam=${idExam}`;
  try {
    const conf = window.confirm('Are you sure to delete?');
    // if (!conf) return;
    if (!conf) throw new Error('Delete canceled');
    const resp = await fetch(url);
    const data = await resp.json();
    if (data) {
      const newCreateds = createdExams.filter((n) => n.ID !== idExam);
      setCreatedExams(newCreateds);
      setBackUp({ ...backUp, createdExams: newCreateds });
      alert('Delete successfully')
      window.location.reload(true);
    } else throw new Error("Delete failed");
  } catch (e) {
    alert(e);
  }
};

const LecExamList = ({ phpHandler, classes }) => {
  const { uid, setIsDimmed } = useGlobalContext();
  const [examAssigns, setExamAssigns] = useState([]);
  const [createdExams, setCreatedExams] = useState([]);
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [backUp, setBackUp] = useState({
    isBackedUp: false,
    examAssigns: [],
    createdExams: [],
  });
  const [searchValueCreated, setSearchValueCreated] = useState("");
  const [selectedAssign, setSelectedAssign] = useState(-1);
  const [selectedCreated, setSelectedCreated] = useState(-1);
  const [isAddingNewExam, setIsAddingNewExam] = useState(false);
  const listOfIDs = classes.map((n) => n.classID);
  const handleAdd = () => {
    setIsDimmed(true);
    setIsOpeningModal(true);
  };
  useEffect(() => {
    if (!uid || examAssigns.length || createdExams.length) return;
    getExamsForListOfClasses(
      uid,
      phpHandler,
      setExamAssigns,
      backUp,
      setBackUp
    );
    getListOfCreatedExams(uid, phpHandler, setCreatedExams, backUp, setBackUp);
  }, [uid, examAssigns.length, createdExams.length, phpHandler, backUp]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleSearchAssign = () => {
    if (!backUp.isBackedUp) {
      setBackUp({ isBackedUp: true, examAssigns, createdExams });
    }
    if (backUp.isBackedUp && searchValue === "") {
      setExamAssigns(backUp.examAssigns);
    } else {
      const newAssigns = [];
      examAssigns.forEach((n) => {
        if (
          Object.values(n).find((n2) => n2.includes(searchValue.toUpperCase()))
        )
          newAssigns.push(n);
      });
      if (!newAssigns.length) {
        alert('No result found');
        return;
      }
      setExamAssigns(newAssigns);
    }
    return false;
  };
  const handleSearchCreated = () => {
    if (!backUp.isBackedUp) {
      setBackUp({ isBackedUp: true, examAssigns, createdExams });
    }
    if (backUp.isBackedUp && searchValueCreated === "") {
      setCreatedExams(backUp.createdExams);
    } else {
      const newCreated = [];
      createdExams.forEach((n) => {
        if (
          Object.values(n).find((n2) =>
            n2.toUpperCase().includes(searchValueCreated.toUpperCase())
          )
        )
          newCreated.push(n);
      });
      if (!newCreated.length) {
        alert('No search result found');
        return;
      }
      setCreatedExams(newCreated);
    }
    return false;
  };
  const handleDeleteAssign = () => {
    if (selectedAssign < 0) {
      alert("Please first select an assign to delete");
      return;
    }
    deleteExamAssign(
      phpHandler,
      examAssigns[selectedAssign].id_class,
      examAssigns[selectedAssign].id_exam,
      setExamAssigns,
      examAssigns,
      setBackUp,
      backUp
    );
  };
  const navi = useNavigate();
  const navigateToContent = (examId) => {
    navi(`Content/${examId}`);
  };
  const handleDeleteCreated = () => {
    if (selectedCreated < 0) {
      alert("Please first select an exam to delete");
      return;
    }
    deleteCreatedExams(
      phpHandler,
      createdExams[selectedCreated].examId,
      setCreatedExams,
      createdExams,
      setBackUp,
      backUp
    );
  };
  return (
    <>
      <AddNewExam
        isAddingNewExam={isAddingNewExam}
        setIsAddingNewExam={setIsAddingNewExam}
        createdExams={createdExams}
        setCreatedExams={setCreatedExams}
      />
      <AssignNewExam
        phpHandler={phpHandler}
        setExamAssigns={setExamAssigns}
        listOfIDs={listOfIDs}
        examAssigns={examAssigns}
        createdExams={createdExams}
        setIsOpeningModal={setIsOpeningModal}
        isOpeningModal={isOpeningModal}
      />
      <div className="manage-exam">
        {/* Exam assigns */}
        <div className="exam-assign-btns">
          <div className="exam-assign-btn" onClick={handleAdd}>
            Add
          </div>
          <form
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchAssign();
            }}
          >
            <input
              type="text"
              className="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Leave blank to get all result"
            />
            <button type="submit">
              <AiOutlineSearch />
            </button>
          </form>
          <div className="exam-assign-btn" onClick={handleDeleteAssign}>
            Delete
          </div>
        </div>
        <h1>List of assigned exams</h1>
        {examAssigns && (
          <div className="exam-assign-list">
            <div className="headings">
              <h1>Class ID</h1>
              <h1>Class name</h1>
              <h1>Exam ID</h1>
            </div>
            {examAssigns.map((n, index) => (
              <div
                key={index}
                className={`${index === selectedAssign
                  ? "exam-assign-item isSelected"
                  : "exam-assign-item"
                  }`}
                onClick={() => setSelectedAssign(index)}
              >
                {Object.values(n).map((n2, index2) => (
                  <p className="value" key={index2}>
                    {n2}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
        {/* Created exams */}
        <div className="exam-assign-btns">
          <div
            className="exam-assign-btn"
            onClick={() => setIsAddingNewExam(true)}
          >
            Add
          </div>
          <form
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchCreated();
            }}
          >
            <input
              type="text"
              className="text"
              value={searchValueCreated}
              onChange={(e) => setSearchValueCreated(e.target.value)}
              placeholder="Leave blank to get all result"
            />
            <button type="submit">
              <AiOutlineSearch />
            </button>
          </form>
          <div className="exam-assign-btn" onClick={handleDeleteCreated}>
            Delete
          </div>
        </div>
        <h1>List of created exams</h1>
        {typeof createdExams && (
          <div className="created-exam-list">
            <div className="headings">
              <h1>Exam ID</h1>
              <h1>Exam name</h1>
              <h1>Subject name</h1>
              <h1>Subject ID</h1>
            </div>
            {createdExams.map((n, index) => (
              <div
                key={index}
                className={`${index === selectedCreated
                  ? "created-exam isSelected"
                  : "created-exam"
                  }`}
                onClick={() => setSelectedCreated(index)}
                onDoubleClick={() => navigateToContent(n.examId)}
              >
                <h1>{n.examId}</h1>
                <h1>{n.name}</h1>
                <h1>{n.subjectName}</h1>
                <h1>{n.subjectID}</h1>
              </div>
            ))}
          </div>
        )}
        <div className="info-card" style={{ position: "absolute" }}>
          <AiOutlineBulb className="Ico" />
          <h1>
            Instructions<span>!!!</span>
          </h1>
          <h2>
            To delete, first select a row then press the respective delete
            button on the top.
          </h2>
          <h3>
            Use the search bar to search for any item in the list or leave it
            blank to get original list back.
          </h3>
          <h4>Double click on an exam to view its content.</h4>
        </div>
      </div>
    </>
  );
};
export default LecExamList;
