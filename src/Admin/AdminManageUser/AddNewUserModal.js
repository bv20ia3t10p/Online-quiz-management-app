import React, { useState } from "react";
import { useGlobalContext } from "../../setup/Context";

const addNewUserToDB = async (
  phpHandler,
  fields = { role: "stu", password: "", name: "", phone: "", email: "" }
) => {
  console.log(fields);
  let prep = phpHandler + "?";
  switch (fields.role) {
    case "stu": {
      prep += `addNewStudentToDB="${fields.name}"&`;
      break;
    }
    case "lec": {
      prep += `addNewLecturerToDB="${fields.name}"&`;
      break;
    }
    case "adm": {
      prep += `addNewAdminToDB="${fields.name}"&`;
      break;
    }
    default: {
      alert("Invalid role");
      return;
    }
  }
  prep += `password="${fields.password}"&phone="${fields.phone}"&email="${fields.email}"`;
  const url = encodeURI(prep);
  if (!fields.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) {
    alert('Invalid email address');
    return;
  }
  if (!/^\d+$/.test(fields.phone)) {
    alert('Invalid phone number');
    return;
  }

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to insert");
    alert("Successfully inserted");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

const AddNewUserModal = ({ isAdding, setIsAdding }) => {
  const [fields, setFields] = useState({
    role: "stu",
    password: "",
    name: "",
    phone: "",
    email: "",
  });
  const { phpHandler } = useGlobalContext();
  const handleAdd = () => {
    addNewUserToDB(phpHandler, fields);
    setIsAdding(false);
  };
  return (
    <div
      className={`${isAdding
        ? "admin-manage-user-add-new"
        : "admin-manage-user-add-new isHidden"
        }`}
    >
      <div className="admin-manage-user-add-new-field">
        <label htmlFor="role">Role</label>
        <select
          name="role"
          id="role"
          className="role-dropDown"
          onChange={(e) => {
            setFields({ ...fields, role: e.target.value });
          }}
          value={fields.role}
        >
          <option value="stu">Student</option>
          <option value="lec">Lecturer</option>
          <option value="adm">Admin</option>
        </select>
      </div>
      <div className="admin-manage-user-add-new-field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          placeholder={`Name`}
        />
      </div>
      <div className="admin-manage-user-add-new-field">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={fields.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
          placeholder={`Password`}
        />
      </div>
      <div className="admin-manage-user-add-new-field">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={fields.phone}
          onChange={(e) => setFields({ ...fields, phone: e.target.value })}
          placeholder={`Phone`}
        />
      </div>{" "}
      <div className="admin-manage-user-add-new-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          placeholder={`Email address`}
        />
      </div>
      <div className="admin-manage-user-add-new-btns">
        <button className="btns" onClick={handleAdd}>
          Confirm
        </button>
        <button className="btns" onClick={() => setIsAdding(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNewUserModal;
