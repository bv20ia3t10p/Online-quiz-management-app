export const fetchExam = async (phpHandler, classID, seed) => {
  const url = phpHandler + "?fetchExam=" + classID + "&seed=" + seed;
  const resp = await fetch(url);
  const data = await resp.json();
  localStorage.setItem("questionList", JSON.stringify(data));
  return data;
};

export const getStoredExam = (classID, phpHandler) => {
  const questionList = localStorage.getItem("questionList");
  const seed = new Date().getTime().toString();
  if (!questionList) return fetchExam(phpHandler, classID, seed);
  else {
    return JSON.parse(questionList);
  }
};
