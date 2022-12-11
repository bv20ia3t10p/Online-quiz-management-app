import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../setup/Context";
import { getStuClass, getStuData } from "../fetchStudentInfo";
import EnrollNewClassStu from "./EnrollNewClassStu";
import StuInfoClasses from "./StuInfoClasses";
import StuInfoPersonDetail from "./StuInfoPerson";

const StuInfo = () => {
  const { sid } = useParams("sid");
  const { uid, phpHandler, privilege } = useGlobalContext();
  const [state, setState] = useState({ classes: [] }); //Will include classList and userInfo
  const [isAddingClasses, setIsAddingClasses] = useState(false);
  const [isEditing, setIsEditing] = useState([]);
  const [isEditable, setIsEditable] = useState([]);
  //   const submitChange = (property, newVal) => {};
  useEffect(() => {
    const getInfo = async () => {
      const classes = await getStuClass(phpHandler, sid);
      const info = await getStuData(phpHandler, sid);
      const data = { ...info, classes };
      setState(data);
      setIsEditing(Object.keys(data).map((n) => false));
      switch (privilege) {
        case "Admin": {
          setIsEditable(
            Object.keys(data).map((n) => {
              return true;
            })
          );
          break;
        }
        case "Student": {
          if (sid !== uid) break;
          else
            setIsEditable(
              Object.keys(data).map((n, index) =>
                index > 1 && index < 4 ? true : false
              )
            );
          break;
        }
        default:
          break;
      }
      return data;
    };
    getInfo();
  }, [phpHandler, sid, privilege, uid]);
  return (
    <>
      {isAddingClasses && (
        <EnrollNewClassStu setIsAddingClasses={setIsAddingClasses} />
      )}
      <div
        className={isAddingClasses ? `StuInfo-Basic dimmed` : "StuInfo-Basic"}
      >
        <h1>Information page for student: {sid}</h1>
        {Object.keys(state).map((n0, index) => {
          if (index === 4)
            return (
              <ClassesList
                index={index}
                key={index}
                isEditable={isEditable}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                state={state}
                uid={uid}
                phpHandler={phpHandler}
                setState={setState}
                setIsAddingClasses={setIsAddingClasses}
              />
            );
          switch (index) {
            case 0:
              return (
                <StuInfoPersonDetail
                  key={index}
                  text={"Student ID"}
                  value={state.ID}
                  isEditable={isEditable}
                  isEditing={isEditing}
                  index={index}
                  state={state}
                  setState={setState}
                  setIsEditing={setIsEditing}
                />
              );
            case 1:
              return (
                <StuInfoPersonDetail
                  key={index}
                  text={"Full name"}
                  value={state.name}
                  isEditable={isEditable}
                  isEditing={isEditing}
                  index={index}
                  state={state}
                  setState={setState}
                  setIsEditing={setIsEditing}
                />
              );
            case 2:
              return (
                <StuInfoPersonDetail
                  key={index}
                  text={"Phone number"}
                  value={state.phone}
                  isEditable={isEditable}
                  isEditing={isEditing}
                  index={index}
                  state={state}
                  setState={setState}
                  setIsEditing={setIsEditing}
                />
              );
            case 3:
              return (
                <StuInfoPersonDetail
                  key={index}
                  text={"Email address"}
                  value={state.email}
                  isEditable={isEditable}
                  isEditing={isEditing}
                  index={index}
                  state={state}
                  setState={setState}
                  setIsEditing={setIsEditing}
                />
              );
            default:
          }
          return <></>;
        })}
      </div>
    </>
  );
};

const ClassesList = ({
  index,
  isEditable,
  setIsEditing,
  isEditing,
  state,
  uid,
  phpHandler,
  setState,
  setIsAddingClasses,
}) => {
  return (
    <>
      <h1 key={index * 2}>List of enrolled classes:</h1>;
      {isEditable[4] && (
        <button
          key={index * 3}
          className="edit-class-btn"
          onClick={() => {
            setIsEditing(
              isEditing.map((n, index) => (index === 4 ? true : false))
            );
          }}
        >
          Edit
        </button>
      )}
      <StuInfoClasses
        key={index}
        classes={state.classes}
        isEditing={isEditing}
        uid={uid}
        phpHandler={phpHandler}
        state={state}
        setState={setState}
        setIsEditing={setIsEditing}
        setIsAddingClasses={setIsAddingClasses}
      />
    </>
  );
};

export default StuInfo;
