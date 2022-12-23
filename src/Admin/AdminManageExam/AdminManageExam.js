import React, { useEffect, useState } from "react";

const getAllStudentExams = async (phpHandler, setExams, setBackUp) => {
  const url = phpHandler + `?getAllStudentExams`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
    setExams(data);
    setBackUp(data);
  } catch (e) {
    alert(e);
  }
};

const getAnwersByExam = async (
  phpHandler,
  studentExamID,
  setAnswers,
  setAnswersBackUp
) => {
  const url = phpHandler + `?getAnswersForExam=${studentExamID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
    setAnswers(data);
    setAnswersBackUp(data);
  } catch (e) {
    alert(e);
  }
};

const AdminManageExam = () => {
  const [studentExams, setStudentExams] = useState([]);
  const [backUp, setBackUp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      getAllStudentExams(phpHandler, setExams);
      setIsLoading(false);
    }
  });
  return <div>AdminManageExam</div>;
};

export default AdminManageExam;
