export const fetchLecturers = async (phpHandler, setLecturers) => {
  const url = phpHandler + `?getAllLecturers`;
  console.log("lec", url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get lecturers information");
    setLecturers({ lecturers: data, backUp: data });
  } catch (e) {
    console.log(e);
  }
};

export const editLecturer = async (phpHandler, idClass) => {
  if (!idClass) return;
  const idl = prompt("Enter new lecturer ID for this class");
  const url = phpHandler + `?editLecturerForClass=${idClass}&idl=${idl}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to edit");
    alert("Success");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

export const fetchSubjects = async (phpHandler, setSubjects) => {
  const url = phpHandler + `?getAllSubjectsForAdmin`;
  console.log("sub", url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get subjects");
    setSubjects({ subjects: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

export const fetchStudentsInClass = async (
  phpHandler,
  idClass,
  setStudents
) => {
  const url = phpHandler + `?getAllStudentsInClass=${idClass}`;
  console.log("enroleld", url);

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get students in class");
    setStudents({ students: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

export const fetchStudentsNotInClass = async (
  phpHandler,
  idClass,
  setStudentsNotInClass
) => {
  const url = phpHandler + `?getAllStudentsNotInClass=${idClass}`;
  console.log("notEnroleld", url);

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get students not in class");
    setStudentsNotInClass({ students: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

export const fetchAllClasses = async (phpHandler, setClasses) => {
  const url = phpHandler + `?getAllClassesForAdmin`;
  console.log("classes", url);

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get classes");
    setClasses({ classes: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

export const enrollStudent = async (
  phpHandler,
  selectedNotIn,
  classID,
  students,
  setStudents,
  studentsNotIn,
  setStudentsNotIn
) => {
  const url =
    phpHandler +
    `?insertEnrollStu=${studentsNotIn.students[selectedNotIn].id}&class=${classID}`;
  try {
    if (!studentsNotIn.students[selectedNotIn].id || !classID)
      throw new Error("Not enough information");
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Insert student");
    setStudents({
      students: [...students.students, studentsNotIn.students[selectedNotIn]],
      backUp: [...students.backUp, studentsNotIn.backUp[selectedNotIn]],
    });
    setStudentsNotIn({
      students: studentsNotIn.students.filter(
        (n, index) => index !== selectedNotIn
      ),
      backUp: studentsNotIn.backUp.filter(
        (n, index) => index !== selectedNotIn
      ),
    });
  } catch (e) {
    alert(e);
  }
};

export const unEnrollStudent = async (
  phpHandler,
  selectedStudent,
  classID,
  students,
  setStudents,
  studentsNotIn,
  setStudentsNotIn
) => {
  const url =
    phpHandler +
    `?removeClassEnrollment=${classID}&stu=${students.students[selectedStudent].id}`;
  try {
    if (!students.students[selectedStudent].id || !classID)
      throw new Error("Not enough information");
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Insert student");
    setStudentsNotIn({
      students: [...studentsNotIn.students, students.students[selectedStudent]],
      backUp: [...studentsNotIn.backUp, students.backUp[selectedStudent]],
    });
    setStudents({
      students: students.students.filter(
        (n, index) => index !== selectedStudent
      ),
      backUp: students.backUp.filter((n, index) => index !== selectedStudent),
    });
  } catch (e) {
    alert(e);
  }
};
