import React, { useState } from "react";
import { addNewQuestionToDB } from "./LecQuestion";
import * as XLSX from "xlsx";
import { useGlobalContext } from "../../setup/Context";

const LecInsertQuestionThroughFile = ({
  lecInfo,
  isAddingThroughFile,
  setIsAddingThroughFile,
  created,
  setCreated,
}) => {
  const { phpHandler } = useGlobalContext();
  const [imported, setImported] = useState([]);
  const handleFileImport = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      // const wb = XLSX.read(bstr, {type:'binary'});
      /* Get first worksheet */
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {
        header: 1,
      }); /* Update state */
      console.log("Data>>>" + data);
      setImported(data);
    };
    // const data = await file.arrayBuffer();
    reader.readAsBinaryString(file);
  };
  const handleAdd = (e) => {
    imported.forEach(
      (n, index) =>
        index !== 0 &&
        addNewQuestionToDB(
          phpHandler,
          n[0],
          n[1],
          n[2],
          n[3],
          n[4],
          n[5],
          lecInfo.subjectID,
          //   currentSubject.subjectID,
          lecInfo.id,
          created,
          setCreated
        )
    );
    alert("Success");
    window.location.reload();
  };
  return (
    <div
      className={`${
        isAddingThroughFile
          ? "lec-question-insert-file"
          : "lec-question-insert-file isHidden"
      }`}
    >
      <input type="file" onChange={handleFileImport} />
      {imported.map((n, index) => {
        return (
          <div key={index} className="lec-question-inserted-single">
            {Object.values(n).map((n2, index2) => {
              return (
                <span
                  className="lec-question-inserted-single-value"
                  key={index2}
                >
                  {n2}
                </span>
              );
            })}
          </div>
        );
      })}
      <div className="btns">
        <button onClick={() => setIsAddingThroughFile(false)}>Cancel</button>
        <button onClick={handleAdd}>Confirm</button>
      </div>
    </div>
  );
};

export default LecInsertQuestionThroughFile;
