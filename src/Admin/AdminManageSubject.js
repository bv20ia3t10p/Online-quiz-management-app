import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { fetchSubjects } from "../AdminManageClass/adminManageClassActions";
import { handleSearch } from "./AdminManageExam/AdminManageExamActions";
import { useGlobalContext } from "../setup/Context";

const insertSubject = async (phpHandler) => {
  const subjectName = prompt("Enter subject name (e.g IT004)");
  if (!subjectName) return;
  const subjectDescription = prompt(
    "Enter subject description (Database management system)"
  );
  if (!subjectDescription) return;
  const prep =
    phpHandler +
    `?insertNewSubjectToDB=${subjectName}&des=${subjectDescription}`;
  const url = encodeURI(prep);
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

const editSubject = async (phpHandler, idSubject) => {
  //0 -> both desc and name
  //1 -> name / newDesc
  //2 -> return
  let insertType = 0;
  const newDesc = prompt("Enter new description");
  const newName = prompt("Enter new name");
  let prep = phpHandler;
  if (newDesc && newName)
    prep += `?editSubjectValues=${idSubject}&desc=${newDesc}&name=${newName}`;
  else if (newDesc)
    prep += `?editSubjectDescription=${newDesc}&ids=${idSubject}`;
  else if (newName) prep += `?editSubjectName=${newName}&ids=${idSubject}`;
  else return;
  const url = encodeURI(prep);
  console.log(url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to update fields");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

const deleteSubject = async (phpHandler, idSubject) => {
  const url = phpHandler + `?deleteSubjectFromDB=${idSubject}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to delete");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

const AdminManageSubject = () => {
  const [subjects, setSubjects] = useState({ subjects: [], backUp: [] });
  const [selected, setSelected] = useState(0);
  const [searchSubject, setSearchSubject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { phpHandler } = useGlobalContext();
  useEffect(() => {
    if (isLoading) {
      fetchSubjects(phpHandler, setSubjects);
      setIsLoading(false);
    }
  }, [isLoading, phpHandler]);
  if (!isLoading)
    return (
      <div className="admin-manage-subject">
        <div className="admin-manage-subject-btns">
          <button
            onClick={() => {
              insertSubject(phpHandler);
            }}
          >
            <AiOutlinePlus className="icon" />
          </button>
          <button
            onClick={() => {
              editSubject(phpHandler, subjects.subjects[selected].id);
            }}
          >
            <AiOutlineEdit className="icon" />
          </button>
          <button
            onClick={() => {
              deleteSubject(phpHandler, subjects.subjects[selected].id);
            }}
          >
            <AiOutlineDelete className="icon" />
          </button>
        </div>
        <div className="admin-manage-subject-title">
          List of subjects in database
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(subjects, searchSubject, setSubjects);
          }}
          className="admin-manage-subject-search"
        >
          <input
            type="text"
            onChange={(e) => setSearchSubject(e.target.value)}
            value={searchSubject}
            className="admin-manage-subject-search-inp"
          />
          <button type="submit" className="admin-manage-subject-search-btn">
            <AiOutlineSearch className="icon" />
          </button>
        </form>
        <div className="admin-manage-subject-headers">
          {["ID", "Name", "Description"].map((n, index) => {
            return (
              <span key={index} className="admin-manage-subject-header">
                {n}
              </span>
            );
          })}
        </div>
        <div className="admin-manage-subject-list">
          {subjects.subjects.map((n, index) => {
            return (
              <div
                onClick={() => setSelected(index)}
                key={index}
                className={`${
                  index === selected
                    ? "admin-manage-subject-single isSelected"
                    : "admin-manage-subject-single"
                }`}
              >
                {Object.values(n).map((n2, index2) => {
                  return (
                    <span
                      className="admin-manage-subject-single-value"
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
    );
  return <div className="">Loading</div>;
};

export default AdminManageSubject;
