export const insertData = async (
  idExam,
  idQuestion,
  selection,
  phpHandler,
  idStudent,
  idClass,
  idStudentExam
) => {
  const url =
    phpHandler +
    `?insertAnswer=${idStudent}&idExam=${idExam}&idClass=${idClass}&sel=${selection}&idq=${idQuestion}&idStudentExam=${idStudentExam}`;
  console.log(url);
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

export const handleSubmit = async (
  answers,
  idExam,
  idClass,
  idStudent,
  phpHandler
) => {
  localStorage.removeItem("questionList");
  const url =
    phpHandler +
    `?newStudentExam&idStu=${idStudent}&idClass=${idClass}&idExam=${idExam}`;
  const resp = await fetch(url);
  const newIdStudentExam = await resp.json();
  answers.map((a) => {
    const { idQuestion, selection } = a;
    return insertData(
      idExam,
      idQuestion,
      selection,
      phpHandler,
      idStudent,
      idClass,
      newIdStudentExam.id_student_exam
    );
  });
  localStorage.removeItem("oldClass");
};
