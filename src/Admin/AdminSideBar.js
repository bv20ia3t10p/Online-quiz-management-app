import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineSmile,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "./AdminContext";

const AdminSideBar = () => {
  const { ID, name, phone, email } = useAdminContext();
  const navi = useNavigate();
  const navigateToFunc = (dest) => {
    navi(`${dest}`);
  };
  return (
    <div className="admin-sideBar">
      <div className="admin-sideBar-info">
        <AdminSideBarInfoCard label="ID" ico={<AiOutlineUser />} value={ID} />
        <AdminSideBarInfoCard
          label="Name"
          ico={<AiOutlineSmile />}
          value={name}
        />
        <AdminSideBarInfoCard
          label="Phone"
          ico={<AiOutlinePhone />}
          value={phone}
        />
        <AdminSideBarInfoCard
          label="email"
          ico={<AiOutlineMail />}
          value={email}
        />
      </div>
      <div className="admin-sideBar-function">
        <AdminSideBarFunction
          label="Manage users"
          action={() => navigateToFunc("/Admin/Users")}
        />
        <AdminSideBarFunction
          label={"Manage student exams"}
          action={() => navigateToFunc("/Admin/Exams")}
        />
        <AdminSideBarFunction
          label={"Manage classes"}
          action={() => navigateToFunc("/Admin/Classes")}
        />
        <AdminSideBarFunction
          label="Manage subjects"
          action={() => navigateToFunc("/Admin/Subjects")}
        />
        <AdminSideBarFunction
          label="Analyse data"
          action={() => navigateToFunc("/Admin/Stats")}
        />
      </div>
    </div>
  );
};

const AdminSideBarInfoCard = ({ label, value, ico }) => {
  return (
    <div className="admin-sideBar-info-card">
      <span className="admin-sideBar-info-card-ico">{ico}</span>
      {label !== "email" && (
        <span className="admin-sideBar-info-card-label">{label}</span>
      )}
      <span className="admin-sideBar-info-value">{value}</span>
    </div>
  );
};

const AdminSideBarFunction = ({ label, action }) => {
  return (
    <div onClick={action} className="admin-sideBar-function-single">
      <span className="admin-sideBar-action-single-text">{label}</span>
    </div>
  );
};

export default AdminSideBar;
