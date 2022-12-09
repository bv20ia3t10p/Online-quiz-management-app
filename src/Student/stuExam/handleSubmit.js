export const handleSubmit = async (
  answers,
  idExam,
  idClass,
  idStudent,
  phpHandler
) => {
  localStorage.removeItem("questionList");
  const array = answers.map((a) => {
    const { idQuestion, selection } = a;
    const url =
      phpHandler +
      `?insertAnswer=${idStudent}&idExam=${idExam}&idClass=${idClass}&sel=${selection}&idq=${idQuestion}`;
    fetch(url);
    const insertData = () => {};
    const timy = setTimeout(insertData(), 300);
    clearTimeout(timy);
    return url;
  });
  console.log(array);
};
