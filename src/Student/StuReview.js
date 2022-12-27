import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../setup/Context";
import { useStudentContext } from "./studentContext";
import * as XLSX from "xlsx";

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
  const { ID } = useStudentContext();
  useEffect(() => {
    if (isLoading) {
      if (!ID) return;
      fetchAllResultsForStudent(phpHandler, ID, setResults);
      setIsLoading(false);
    }
  }, [isLoading, phpHandler, ID]);
  return (
    <div>
      StuReview
      <button onClick={() => exportToExcel(results.results)}>
        Click to download
      </button>
    </div>
  );
};

export default StuReview;
