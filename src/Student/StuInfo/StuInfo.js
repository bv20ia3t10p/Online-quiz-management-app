import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../setup/Context";
import { getStuClass, getStuData } from "../fetchStudentInfo";
import EnrollNewClassStu from "./EnrollNewClassStu";
import StuInfoClasses from "./StuInfoClasses";
import StuInfoPersonDetail from "./StuInfoPerson";
import AdminEditPasswordModal from "../../Admin/AdminManageUser/AdminEditPasswordModal";

const StuInfo = () => {
  const { sid } = useParams("sid");
  const { uid, phpHandler, privilege } = useGlobalContext();
  const [state, setState] = useState({ classes: [] }); //Will include classList and userInfo
  const [isAddingClasses, setIsAddingClasses] = useState(false);
  const [isEditing, setIsEditing] = useState([]);
  const [isEditable, setIsEditable] = useState([]);
  const [isChangingPW, setIsChangingPW] = useState(false);
  const handleChangePW = () => {
    setIsChangingPW(true);
  };
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
          setIsEditable([false, true, true, true, true]);
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
      <AdminEditPasswordModal
        isChangingPW={isChangingPW}
        setIsChangingPW={setIsChangingPW}
        userToEditPassWord={sid}
      />
      <div
        className={isAddingClasses ? `StuInfo-Basic dimmed` : "StuInfo-Basic"}
      >
        <h1 className="stu-info-title">Information page for student: {sid}</h1>
        <div className="stu-info-cards">
          <StuInfoPersonDetail
            text={"Student ID"}
            value={state.ID}
            isEditable={isEditable}
            isEditing={isEditing}
            state={state}
            setState={setState}
            setIsEditing={setIsEditing}
          />
          <StuInfoPersonDetail
            text={"Full name"}
            index={1}
            value={state.name}
            isEditable={isEditable}
            isEditing={isEditing}
            state={state}
            setState={setState}
            setIsEditing={setIsEditing}
          />
          <StuInfoPersonDetail
            text={"Phone number"}
            value={state.phone}
            index={2}
            isEditable={isEditable}
            isEditing={isEditing}
            state={state}
            setState={setState}
            setIsEditing={setIsEditing}
          />
          <StuInfoPersonDetail
            text={"Email address"}
            index={3}
            value={state.email}
            isEditable={isEditable}
            isEditing={isEditing}
            state={state}
            setState={setState}
            setIsEditing={setIsEditing}
          />
          <button className="stu-info-change-pw" onClick={handleChangePW}>
            Change login password
          </button>
        </div>
        <ClassesList
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          state={state}
          uid={uid}
          phpHandler={phpHandler}
          setState={setState}
          setIsAddingClasses={setIsAddingClasses}
        />
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
    <div className="stu-info-class">
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
    </div>
  );
};

export default StuInfo;
