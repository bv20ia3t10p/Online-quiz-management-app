export const getAllStudentExams = async (phpHandler, setStudentExams) => {
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

export const editStudentExams = async (phpHandler, type, payload) => {
  let url = phpHandler;
  switch (type) {
    case "Edit": {
      const newScore = prompt("Enter new score");
      const reason = prompt("Enter reason for score change");
      if (!newScore || !reason) return;
      url += `?adjustExamScoreFor=${payload.id_student_exam}&newScore=${newScore}&reason=${reason}&by=${payload.idAdmin}`;
      break;
    }
    case "Delete": {
      url += `?deleteStudentExam=${payload.id_student_exam}`;
      break;
    }
    default:
      return;
  }
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

export const editAnswer = async (phpHandler, type, payload) => {
  let url = phpHandler;
  switch (type) {
    case "Edit": {
      const { idStudentAnswer } = payload;
      if (!idStudentAnswer) return;
      const newVal = prompt(
        "Enter new selection value or leave blank to cancel"
      );
      if (!newVal) return;
      url += `?editStudentAnswer=${idStudentAnswer}&newVal=${newVal}`;
      break;
    }
    case "Delete": {
      const { idStudentAnswer } = payload;
      if (!idStudentAnswer) return;
      url += `?deleteStudentAnswer=${idStudentAnswer}`;
      break;
    }
    case "Insert": {
      const { studentExamID } = payload;
      if (!studentExamID) return;
      //Incase a student encounter a misconduct from the system during the exam
      //and have screenshots of questions and selected answer or other kinds of proofs
      //admin check database for relative question and exams then insert accordingly to the proofs
      //to revail mistakes
      const idQuestion = prompt("Enter question id:");
      const idStudent = prompt("Enter student id:");
      const idExam = prompt("Enter exam id:");
      const idClass = prompt("Enter class id:");
      const selection = prompt("Enter student selection");
      url += `?insertAnswer=${idStudent}&idExam=${idExam}&idClass=${idClass}&selection=${selection}&idq=${idQuestion}&idStudentExam=${studentExamID}`;
      break;
    }
    default:
      return;
  }
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to edit ansewr");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

export const getAnswersByExam = async (
  phpHandler,
  studentExamID,
  setAnswers
) => {
  const url = phpHandler + `?getStudentExamAnswersFor=${studentExamID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
    setAnswers({ stuAnswers: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

export const getScoreChangeLog = async (
  phpHandler,
  studentExamID,
  setScoreChangeLog
) => {
  const url = phpHandler + `?getStudentExamAdjustHistoryFor=${studentExamID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get student exams");
    setScoreChangeLog({ changeLog: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

export const handleSearch = (state, searchValue, setState) => {
  if (!searchValue) {
    setState({
      [`${Object.keys(state)[0]}`]: state.backUp,
      backUp: state.backUp,
    });
  } else {
    const original = Object.values(state)[0];
    const newStateArray = [];
    original.forEach((n) => {
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

export const editScoreChangeLog = async (phpHandler, { type, payload }) => {
  let url = phpHandler;
  switch (type) {
    case "Edit": {
      const newVal = prompt("Enter new reason or leave blank to cancel");
      if (!newVal) return;
      url += `?editScoreChangeLogFor=${payload.id}&newVal=${newVal}`;
      break;
    }
    case "Delete": {
      if (!payload.idScoreChangeLog) return;
      url += `?deleteScoreChangeLogFor=${payload.id}&toDelete=${payload.idScoreChangeLog}`;
      break;
    }
    default:
      return;
  }
  console.log(url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};
