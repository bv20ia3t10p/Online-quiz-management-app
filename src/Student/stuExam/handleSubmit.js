const insertData = async (
  idExam,
  idQuestion,
  selection,
  phpHandler,
  idStudent,
  idClass
) => {
  const url =
    phpHandler +
    `?insertAnswer=${idStudent}&idExam=${idExam}&idClass=${idClass}&sel=${selection}&idq=${idQuestion}`;
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
  const array = answers.map((a) => {
    console.log(answers);
    const { idQuestion, selection } = a;
    return insertData(
      idExam,
      idQuestion,
      selection,
      phpHandler,
      idStudent,
      idClass
    );
  });
  localStorage.removeItem("oldClass");
  console.log(array);
};
