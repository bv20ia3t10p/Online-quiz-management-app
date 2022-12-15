import React from "react";
import { useGlobalContext } from "../setup/Context";
import { useLecContext } from "./LecContext";
import LecExamList from "./LecExamList";

const LecExam = () => {
  const { phpHandler } = useGlobalContext();
  const { id, classes } = useLecContext();
  return (
    <div className="lec-exam">
      <LecExamList phpHandler={phpHandler} classes={classes} />
    </div>
  );
};

export default LecExam;
