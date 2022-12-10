const getStuData = async (phpHandler, uid) => {
  const url = phpHandler + `?getStu=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

const getStuClass = async (phpHandler, uid) => {
  const url = phpHandler + `?getClass=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

const getStuPastExams = async (phpHandler, uid) => {
  alert("not implemented");
};

const fetchStudentInfo = async (phpHandler, uid, setStudentInfo) => {
  const data = await getStuData(phpHandler, uid);
  setStudentInfo(data);
};

const fetchClass = async (phpHandler, uid, setClassList) => {
  const data = await getStuClass(phpHandler, uid);
  setClassList(data);
};

export {
  fetchClass,
  fetchStudentInfo,
  getStuClass,
  getStuData,
  getStuPastExams,
};
