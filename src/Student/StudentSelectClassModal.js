import React, { useState } from "react";
import { useStudentContext } from "./studentContext";

const StudentSelectClassModal = () => {
  const { setIsSelectingClass, classList, setCurrentClass, isSelectingClass } =
    useStudentContext();
  const [currentIndex, setCurrentIndex] = useState(-1);
  return (
    <div
      className={`${
        isSelectingClass ? "stu-selectClass" : "stu-selectClass isHidden"
      }`}
    >
      <div className="table">
        <table>
          <thead className="header">
            <tr>
              {[
                "Class ID",
                "Class name",
                "Lecturer name",
                "Subject",
                "Subject description",
              ].map((n, index) => {
                return <th key={index}>{n}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {classList.map((n, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setCurrentClass({
                      ID_class: n.ID_class,
                      className: n.className,
                    });
                    setCurrentIndex(index);
                    localStorage.setItem(
                      "oldClass",
                      JSON.stringify(n.ID_class)
                    );
                  }}
                  className={
                    index === currentIndex
                      ? "stu-class-tbl-row row-isSelected"
                      : "stu-class-tbl-row"
                  }
                >
                  {Object.values(n).map((n2, index2) => {
                    return <td key={index2}>{n2}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="stu-selectClass-btn-container"
        onClick={() => setIsSelectingClass(false)}
      >
        <h3>Close</h3>
      </div>
    </div>
  );
};

export default StudentSelectClassModal;
