import React from "react";
import { useNavigate } from "react-router-dom";

const StuExamPreview = ({ answers }) => {
  const navi = useNavigate();
  const navigateToHome = () => {
    navi("/Student/Home");
  };
  return (
    <div>
      <h1>Submitted answers</h1>
      {answers.map((n, index) => {
        return (
          <div key={index}>
            {Object.values(n).map((n2, index2) => {
              return <span key={index2}>{n2} </span>;
            })}
          </div>
        );
      })}
      <button onClick={() => navigateToHome()}>Finish</button>
    </div>
  );
};

export default StuExamPreview;
