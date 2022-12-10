import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../setup/Context";
import { getStuClass, getStuData } from "./fetchStudentInfo";

const StuInfo = () => {
  const { sid } = useParams("sid");
  const { phpHandler } = useGlobalContext();
  const [state, setState] = useState({ classes: [] }); //Will include classList and userInfo
  useEffect(() => {
    const getInfo = async () => {
      const classes = await getStuClass(phpHandler, sid);
      const info = await getStuData(phpHandler, sid);
      setState({ classes, ...info });
    };
    getInfo();
  }, [phpHandler, sid]);
  return (
    <div>
      <h1>Information page for student: {sid}</h1>
      {Object.keys(state).map((n0, index) => {
        if (index === 0)
          return (
            <div key={index}>
              <h1>{n0}:</h1>
              <ul>
                {state.classes.map((n, index) => (
                  <li key={index}>
                    <ul>
                      {Object.values(n).map((n2, index2) => (
                        <li key={index2}>{n2}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          );
        return (
          <div key={index}>
            <p>{n0}: </p>
            <span>{state[`${n0}`]}</span>
          </div>
        );
      })}

      <Link to="/">Back to home</Link>
    </div>
  );
};

export default StuInfo;
