import React from "react";
import { useLecContext } from "./LecContext";
import {
  AiOutlineMail,
  AiOutlineSmile,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LecSidebar = () => {
  const { id, name, phone, email } = useLecContext();
  const navigate = useNavigate();
  const toFunction = (destination) => {
    navigate(`${destination}`);
  };
  return (
    <div className="lec-sideBar">
      <div className="info-cards">
        <LecSideInfoCards ico={AiOutlineUser} text={"ID"} value={id} />
        <LecSideInfoCards ico={AiOutlineSmile} text={"Name"} value={name} />
        <LecSideInfoCards ico={AiOutlineMail} text={"Email"} value={email} />
        <LecSideInfoCards ico={AiOutlinePhone} text={"Phone"} value={phone} />
      </div>
      <div className="functions">
        <LecSideFunc
          text={"Information page"}
          action={toFunction}
          params={`/Lecturer/About/${id}`}
        />
        <LecSideFunc
          text={"Manage exams"}
          action={toFunction}
          params={`/Lecturer/Exams`}
        />
        <LecSideFunc
          text={"Manage student scores"}
          action={toFunction}
          params={`/Lecturer/Results`}
        />
        <LecSideFunc
          text={"Analyse data"}
          action={toFunction}
          params={`/Lecturer/Analysis`}
        />
      </div>
    </div>
  );
};

const LecSideFunc = ({ text, action, params }) => {
  return (
    <div className="lec-func-container" onClick={() => action(params)}>
      <h1>{text}</h1>
    </div>
  );
};

const LecSideInfoCards = ({ ico, text, value }) => {
  return (
    <div className="cards">
      <div className="ico-container">{ico}</div>
      <h1>{text}</h1>
      <h2>{value}</h2>
    </div>
  );
};

export default LecSidebar;
