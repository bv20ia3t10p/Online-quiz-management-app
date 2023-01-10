import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../setup/Context";
import { useStudentContext } from "./studentContext";
import * as XLSX from "xlsx";
import { handleSearch } from "../Admin/AdminManageExam/AdminManageExamActions";
import { AiOutlineSearch } from "react-icons/ai";

const fetchAllResultsForStudent = async (phpHandler, idStudent, setResults) => {
  const url = phpHandler + `?getAllResultsForStudent=${idStudent}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get results for student");
    setResults({ results: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

const exportToExcel = (results) => {
  const worksheet = XLSX.utils.json_to_sheet(results);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Student score");
  XLSX.writeFile(workbook, "studentScore.xlsx", { compression: true });
};

const StuReview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState({ results: [], backUp: [] });
  const { phpHandler } = useGlobalContext();
  const { searchValue, setSearchValue } = useState("");
  const { ID } = useStudentContext();
  useEffect(() => {
    if (isLoading) {
      if (!ID) return;
      fetchAllResultsForStudent(phpHandler, ID, setResults);
      setIsLoading(false);
    }
  }, [isLoading, phpHandler, ID]);
  if (isLoading) return <div className="">Loading</div>;
  return (
    <div className="results">
      <h1>Results for student over classes</h1>
      <form
        action=""
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(results, searchValue, setResults);
        }}
      >
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">
          {" "}
          <AiOutlineSearch />
        </button>
      </form>
      <div className="headings">
        {["ID", "C.ID", "Class", "S.ID", "Subject", "Score"].map((n, index) => {
          return (
            <span key={index} className="heading">
              {n}
            </span>
          );
        })}
      </div>
      <div className="list">
        {results.results.map((n, index) => {
          return (
            <div className="single" key={index}>
              {Object.values(n).map((n2, index2) => {
                return (
                  <span className="value" key={index2}>
                    {n2}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={() => exportToExcel(results.results)}>
        Click to download
      </button>
    </div>
  );
};

export default StuReview;
