import React from "react";
import { useGlobalContext } from "../../setup/Context";
import { useLecContext } from "../LecContext";
import LecExamList from "./LecExamList";

const LecExam = () => {
  const { phpHandler } = useGlobalContext();
  const { classes } = useLecContext();
  return (
    <div className="exam-content">
      <LecExamList phpHandler={phpHandler} classes={classes} />
    </div>
  );
};

export default LecExam;
