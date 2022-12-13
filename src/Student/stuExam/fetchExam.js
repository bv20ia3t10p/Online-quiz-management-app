export const fetchExam = async (phpHandler, classID, seed, setExamContent) => {
  console.log("fetching new");
  const url = phpHandler + "?fetchExam=" + classID + "&seed=" + seed;
  const resp = await fetch(url);
  const data = await resp.json();
  localStorage.setItem("questionList", JSON.stringify(data));
  setExamContent(data);
};

export const getStoredExam = (classID, phpHandler, setExamContent) => {
  const questionList = localStorage.getItem("questionList");
  const seed = new Date().getTime().toString();
  if (!questionList)
    return fetchExam(phpHandler, classID, seed, setExamContent);
  else {
    console.log("old questions");
    setExamContent(JSON.parse(questionList));
  }
};
