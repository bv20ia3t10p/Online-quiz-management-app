export const fetchExam = async (phpHandler, classID) => {
  const url = phpHandler + "?fetchExam=" + classID;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(url);
  localStorage.setItem("questionList", JSON.stringify(data));
  console.log(data);
  return data;
};

export const getStoredExam = (classID, phpHandler) => {
  const questionList = localStorage.getItem("questionList");
  if (!questionList) return fetchExam(phpHandler, classID);
  else {
    return JSON.parse(questionList);
  }
};
