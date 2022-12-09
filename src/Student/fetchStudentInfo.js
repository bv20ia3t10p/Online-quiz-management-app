const fetchStudentInfo = async (phpHandler, uid, setStudentInfo) => {
  const url = phpHandler + `?getStu=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setStudentInfo(data);
};

const fetchClass = async (phpHandler, uid, setClassList) => {
  const url = phpHandler + `?getClass=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setClassList(data);
};

export { fetchClass, fetchStudentInfo };
