import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../setup/Context";
import { fetchLecturers, fetchSubjects } from "./adminManageClassActions";
import { handleSearch } from "../Admin/AdminManageExam/AdminManageExamActions";
import { AiOutlineSearch } from "react-icons/ai";

const insertNewClassToSystem = async (
  phpHandler,
  idSubject,
  idLecturer,
  className
) => {
  const url =
    phpHandler +
    `?insertNewClassToSystem=${className}&ids=${idSubject}&idl=${idLecturer}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to insert");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

const InsertClassModal = (isAddingClass, setIsAddingClass) => {
  const [subjects, setSubjects] = useState({ subjects: [], backUp: [] });
  const [searchSubject, setSearchSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [lecturers, setLecturers] = useState({ lecturers: [], backUp: [] });
  const [searchLecturer, setSearchLecturer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLecturer, setSelectedLecturer] = useState(0);
  const [className, setClassName] = useState("");
  const { phpHandler } = useGlobalContext();
  useEffect(() => {
    if (isLoading) {
      fetchLecturers(phpHandler, setLecturers);
      fetchSubjects(phpHandler, setSubjects);
      setIsLoading(false);
    }
  }, [isLoading, phpHandler]);
  const handleAdd = () => {
    insertNewClassToSystem(
      phpHandler,
      subjects.subjects[selectedSubject].id,
      lecturers.lecturers[selectedLecturer].id,
      className
    );
    setIsAddingClass(false);
  };
  if (!isLoading)
    return (
      <div
        className={`${
          isAddingClass
            ? "admin-class-add-modal"
            : "admin-class-add-modal isHidden"
        }`}
      >
        <div className="admin-class-add-subject">
          <span className="admin-class-add-subject-title">
            Select a subject from the list
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(subjects, searchSubject, setSubjects);
            }}
            className="admin-class-add-subject-search"
          >
            <input
              type="text"
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              className="admin-class-add-subject-search-inp"
            />
            <button
              type="submit"
              className="admin-class-add-subject-search-btn"
            >
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-class-add-subject-headers">
            {["ID", "Name", "Description"].map((n, index) => {
              return (
                <span className="admin-class-add-subject-header" key={index}>
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-class-add-subject-list">
            {subjects.subjects.map((n, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedSubject(index)}
                  className={`${
                    index === selectedSubject
                      ? "isSelected admin-class-add-subject-list-single"
                      : "admin-class-add-subject-list-single"
                  }`}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        className="admin-class-add-subject-list-single-value"
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
        <div className="admin-class-add-lecturer">
          <div className="admin-class-add-lecturer-title">
            Select a lecturer from the list
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(lecturers, searchLecturer, setLecturers);
            }}
            className="admin-class-add-lecturer-search"
          >
            <input
              type="text"
              value={searchLecturer}
              onChange={(e) => setSearchLecturer(e.target.value)}
              className="admin-class-add-lecturer-search-input"
            />
            <button
              type="submit"
              className="admin-class-add-lecturer-search-btn"
            >
              <AiOutlineSearch className="icon" />
            </button>
          </form>
          <div className="admin-class-add-lecturer-headers">
            {["ID", "Name", "Phone", "Email"].map((n, index) => {
              return (
                <span key={index} className="admin-class-add-lecturer-header">
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-class-add-lecturer-list">
            {lecturers.lecturers.map((n, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedLecturer(index)}
                  className={`${
                    index === selectedLecturer
                      ? "isSelected admin-class-add-lecturer-list-single"
                      : "admin-class-add-lecturer-list-single"
                  }`}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        className="admin-class-add-lecturer-list-single-value"
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
        <div className="admin-class-add-className">
          <div className="admin-class-add-className-title">
            Insert class name for the new class
          </div>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="admin-class-add-className-name"
          />
          <div className="admin-class-add-className-btns">
            <button className="cancel" onClick={() => setIsAddingClass(false)}>
              Cancel
            </button>
            <button className="confirm" onClick={() => handleAdd()}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
};

export default InsertClassModal;
