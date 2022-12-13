import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../setup/Context";

// Open up a modal, take uid, be able to search for class, selected class appears different
// Dim background =>state value that affects the whole StuInfo
// Classes table
// Whena  lecturer update a student's score, it should appear as a different column e.g. bonus and a column for the reason why
// try catch for inserts that are impossible
// select c.ID as classID, c.name as className,c.ID_lecturer as lecturerID,
// l.name as lecturerName, s.name as subjectName, s.description as subjectDescription
// from classes c
// inner join lecturers l on c.ID_lecturer = l.ID
// inner join subjects s on c.ID_subject = s.ID;
const fetchAllClasses = async (phpHandler, setClasses) => {
  const url = phpHandler + `?getAllClasses=true`;
  const resp = await fetch(url);
  const data = await resp.json();
  setClasses(data);
};
const fetchSingleClass = async (phpHandler, setClasses, searchParam) => {
  const url =
    phpHandler + `?getSingleClass=${searchParam.replaceAll(" ", "_")}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setClasses(data);
};
const insertNewEnrollment = async (phpHandler, uid, classID) => {
  const url = phpHandler + `?insertEnrollStu=${uid}&class=${classID}`;
  const resp = await fetch(url);
  await resp.json();
};

const EnrollNewClassStu = ({ setIsAddingClasses }) => {
  const { phpHandler } = useGlobalContext();
  const { sid } = useParams("sid");
  const uid = sid;
  const [searchValue, setID_class] = useState("Enter 'all' to get all classes");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectecClass] = useState(0);
  useEffect(() => {
    fetchAllClasses(phpHandler, setClasses);
  }, [setClasses, phpHandler, uid]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "all") {
      fetchAllClasses(phpHandler, setClasses);
      return;
    }
    fetchSingleClass(phpHandler, setClasses, searchValue);
  };
  const handleAdd = () => {
    insertNewEnrollment(phpHandler, uid, classes[selectedClass].classID);
    setIsAddingClasses(false);
  };
  return (
    <div className="enroll-new-class-modal">
      <form className="enroll-new-class-search" onSubmit={handleSearch}>
        <p>Search for class:</p>
        <input
          type="text"
          name="searchValue"
          id="searchValue"
          value={searchValue}
          onChange={(e) => {
            setID_class(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
      <div className="enroll-new-class-list">
        <div className="enroll-single-class header">
          <div>Class ID</div>
          <div>Class name</div>
          <div>Lecturer ID</div>
          <div>Lecturer name</div>
          <div>Subject ID</div>
          <div>Subject description</div>
        </div>
        {classes.map((n, index) => {
          return (
            <div
              className={`${
                selectedClass === index
                  ? "enroll-single-class selected"
                  : "enroll-single-class"
              }`}
              key={index}
              onClick={() => setSelectecClass(index)}
            >
              {Object.values(n).map((n2, index2) => {
                return (
                  <div className="detail" key={index2}>
                    {n2}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        className="enroll-new-class-modal-add"
        onClick={() => handleAdd()}
      >
        Add
      </button>
    </div>
  );
};

export default EnrollNewClassStu;
