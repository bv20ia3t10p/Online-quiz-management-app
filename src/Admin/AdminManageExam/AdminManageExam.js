import React, { useEffect, useState } from "react";

const getAllStudentExams = async (phpHandler, setStudentExams) => {
  const url = phpHandler + `?getAllStudentExams`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
    setStudentExams({ stuExams: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

const editAnswer = async (phpHandler, idStudentExam, field, newVal) => {
  const url =
    phpHandler +
    `?editStudentAnswer=${idStudentExam}&field=${field}&newVal=${newVal}`;
  const newVal = prompt("Enter new value");
  if (newVal) {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (!data) throw new Error("Failed to edit ansewr");
    } catch (e) {
      alert(e);
    }
  }
};

const getAnswersByExam = async (phpHandler, studentExamID, setAnswers) => {
  const url = phpHandler + `?getAnswersForExam=${studentExamID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
    setAnswers({ stuAnswers: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

const getScoreChangeLog = async (
  phpHandler,
  studentExamID,
  setScoreChangeLog
) => {
  const url = phpHandler + `?getScoreChangeLogForExam=${studentExamID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
  } catch (e) {
    alert(e);
  }
};

const handleSearch = (state, searchValue, setState) => {
  if (!searchValue) {
    setState({
      [`${Object.keys(state)[0]}`]: state.backUp,
      backUp: state.backUp,
    });
  } else {
    const original = Object.values(state)[0];
    const newStateArray = [];
    newStateArray.forEach((n) => {
      if (
        Object.values(n).find((n2) =>
          n2.toUpperCase().includes(searchValue.toUpperCase())
        )
      )
        newStateArray.push(n);
    });
    setState({
      [`${Object.keys(state)[0]}`]: newStateArray,
      backUp: state.backUp,
    });
  }
};

const AdminManageExam = () => {
  const [studentExams, setStudentExams] = useState({
    stuExams: [],
    backUp: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState({ stuAnswers: [], backUp: [] });
  const [selected, setIsSelected] = useState(false);
  const [scoreChangeLog, setScoreChangeLog] = useState({
    changeLog: [],
    backUp: [],
  });
  const [searchStudentExams, setSearchStudentExams] = useState("");
  const [searchScoreChangeLog, setSearchScoreChangeLog] = useState("");
  const [searchStudentAnswer, setSearchStudentAnswer] = useState("");
  useEffect(() => {
    if (isLoading) {
      getAllStudentExams(phpHandler, setExams);
      setIsLoading(false);
    }
  });
  useEffect(() => {
    getAnswersByExam(phpHandler, studentExams[selected].id, setAnswers);
    getScoreChangeLog(phpHandler, studentExams[selected].id, setScoreChangeLog);
  }, [selected]);
  return <div className="admin-manage-exam"></div>;
};

export default AdminManageExam;
