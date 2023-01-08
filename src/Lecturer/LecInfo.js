import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../setup/Context";
import { fetchLecInfo } from "./LecContext";
import AdminEditPasswordModal from "../Admin/AdminManageUser/AdminEditPasswordModal";

const handleInfoChange = async (field, phpHandler, lid) => {
  const newVal = prompt("Enter new value").toString();
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
  const url = phpHandler + `?updFieldLec=${field}&newVal=${encoded}&lid=${lid}`;
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

const LecInfo = () => {
  const [lecInfo, setLecInfo] = useState({});
  const { phpHandler, privilege, uid } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const { lid } = useParams("lid");
  const [isEditable, setIsEditable] = useState([]);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  //   {"id":"8081",
  //   "name": "Nguyen Van A1",
  //   "phone":"0380801000",
  //   "email":"uit80801@gm.uit.edu.vn",
  //   "classes":[{"classID":"3001","className":"IT004.HTCL.M11","subject":"Fundamentals of Database Systems","classAvg":"192","subjectID":"1001","examNumbers":"1","subjectName":"IT004"},{"classID":"3002","className":"IS201.HTCL.M11","subject":"Information System Analysis and Design","classAvg":null,"subjectID":"1002","examNumbers":"0","subjectName":"IS201"},{"classID":"3003","className":"IS210.HTCL.M11","subject":"Database Manegment Systems","classAvg":null,"subjectID":"1003","examNumbers":"0","subjectName":"IS210"},{"classID":"3004","className":"IT001.HTCL.M11","subject":"Introduction to Programming","classAvg":null,"subjectID":"1004","examNumbers":"0","subjectName":"IT001"},{"classID":"3005","className":"MA006.HTCL.M11","subject":"Mathematical analysis",
  //     "classAvg":null,
  //     "subjectID":"1005",
  //     "examNumbers":"0",
  //     "subjectName":"MA006"}]}
  useEffect(() => {
    if (isLoading) {
      fetchLecInfo(phpHandler, lid, setLecInfo);
      if (!lecInfo) return;
      setIsLoading(false);
    }
  }, [isLoading, lecInfo, setLecInfo, setIsLoading, lid, phpHandler]);
  useEffect(() => {
    switch (privilege) {
      case "Admin": {
        setIsEditable([false, true, true, true, true]);
        break;
      }
      case "Lecturer": {
        if (uid.toString() === lid.toString())
          setIsEditable([false, false, true, true, false]);
        else setIsEditable([false, false, false, false, false]);
        break;
      }
      default: {
        setIsEditable([false, false, false, false, false]);
      }
    }
  }, [uid, privilege, setIsEditable, lid]);
  if (isLoading) return <div className="loading">Loading</div>;
  return (
    <div className="lec-info">
      <AdminEditPasswordModal
        isChangingPW={isEditingPassword}
        setIsChangingPW={setIsEditingPassword}
        userToEditPassWord={lid}
      />
      <span className="lec-info-heading">
        Information page for lecturer {lid}
      </span>
      <div className="lec-info-cards">
        <div className="lec-info-card">
          <span className="lec-info-card-label">ID</span>
          <span className="lec-info-card-value">{lecInfo.id}</span>
        </div>
        <div className="lec-info-card">
          <span className="lec-info-card-label">Full name</span>
          <span className="lec-info-card-value">{lecInfo.name}</span>
          {isEditable[1] && (
            <span className="lec-info-card-edit">
              <AiOutlineEdit
                className="icon"
                onClick={() => handleInfoChange("name", phpHandler, lid)}
              />
            </span>
          )}
        </div>
        <div className="lec-info-card">
          <span className="lec-info-card-label">Phone</span>
          <span className="lec-info-card-value">{lecInfo.phone}</span>
          {isEditable[2] && (
            <span className="lec-info-card-edit">
              <AiOutlineEdit
                className="icon"
                onClick={() => handleInfoChange("phone", phpHandler, lid)}
              />
            </span>
          )}
        </div>
        <div className="lec-info-card">
          <span className="lec-info-card-label">Email</span>
          <span className="lec-info-card-value">{lecInfo.email}</span>
          {isEditable[3] && (
            <span className="lec-info-card-edit">
              <AiOutlineEdit
                className="icon"
                onClick={() => handleInfoChange("email", phpHandler, lid)}
              />
            </span>
          )}
        </div>
        <div className="lec-info-card">
          <button
            onClick={() => setIsEditingPassword(true)}
            className="lec-info-card-change-pw"
          >
            Change password
          </button>
        </div>
      </div>
      <div className="lec-info-classes">
        <span className="lec-info-classes-title">List of teaching classes</span>
        <div className="lec-info-classes-headers">
          {["Class ID", "Class name", "Subject"].map((n, index) => (
            <span className="lec-info-classes-header" key={index}>
              {n}
            </span>
          ))}
        </div>
        <div className="lec-info-classes-list">
          {lecInfo.classes &&
            lecInfo.classes.map((n, index) => {
              return (
                <div key={index} className="lec-info-classes-list-class">
                  {[n.classID, n.className, n.subject].map((n2, index2) => {
                    return (
                      <span
                        className="lec-info-classes-list-class-value"
                        key={index2}
                      >
                        {n2}
                      </span>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LecInfo;
