import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../setup/Context";
import { fetchAdminInfo } from "./AdminContext";
const handleInfoChange = async (field, phpHandler, aid) => {
  const newVal = prompt("Enter new value");
  if (field === 'email') {
    if (!newVal.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      alert('Invalid email address');
      return;
    }
  }
  if (field === 'phone') {
    if (!/^\d+$/.test(newVal)) {
      alert('Invalid phone number');
      return;
    }
  }
  const encoded = encodeURI(newVal);
  const url = phpHandler + `?updFieldAdm=${field}&newVal=${encoded}&aid=${aid}`;
  console.log(url);
  try {
    const data = await fetch(url);
    await data.json();
    if (!data) throw new Error("Failed to edit");
    alert("Updated successfully");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};
const AdminInfo = () => {
  const { aid } = useParams("aid");
  const { privilege, phpHandler } = useGlobalContext();
  const isEditable = privilege === "Admin" ? true : false;
  const [adminInfo, setAdminInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      fetchAdminInfo(phpHandler, aid, setAdminInfo);
      setIsLoading(false);
    }
  }, [isLoading, phpHandler, aid]);

  return (
    <div className="admin-info">
      <span className="admin-info-title">
        Basic information for admin {aid}
      </span>
      <div className="admin-info-card">
        <span className="admin-info-card-label">ID</span>
        <span className="admin-info-card-value">{adminInfo.ID}</span>
      </div>
      <div className="admin-info-card">
        <span className="admin-info-card-label">Name</span>
        <span className="admin-info-card-value">{adminInfo.name}</span>
        {isEditable && (
          <span className="admin-info-card-edit">
            <AiOutlineEdit
              onClick={() => handleInfoChange("name", phpHandler, aid)}
            />
          </span>
        )}
      </div>
      <div className="admin-info-card">
        <span className="admin-info-card-label">Email</span>
        <span className="admin-info-card-value">{adminInfo.email}</span>
        {isEditable && (
          <span className="admin-info-card-edit">
            <AiOutlineEdit
              onClick={() => handleInfoChange("email", phpHandler, aid)}
            />
          </span>
        )}
      </div>
      <div className="admin-info-card">
        <span className="admin-info-card-label">Phone</span>
        <span className="admin-info-card-value">{adminInfo.phone}</span>
        {isEditable && (
          <span className="admin-info-card-edit">
            <AiOutlineEdit
              onClick={() => handleInfoChange("phone", phpHandler, aid)}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminInfo;
