import React, { useState } from "react";
import { useGlobalContext } from "../../setup/Context";

const handleEditPassword = async (phpHandler, userID, newPW) => {
  const prep = phpHandler + `?setNewPassWordForUser=${userID}&pw="${newPW}"`;
  const url = encodeURI(prep);
  console.log(url);
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to edit password");
  } catch (e) {
    alert(e);
  }
};

const AdminEditPasswordModal = ({
  userToEditPassWord,
  setIsChangingPW,
  isChangingPW,
}) => {
  const { phpHandler } = useGlobalContext();
  const [newPassword, setNewPassword] = useState("");
  const handleEdit = () => {
    handleEditPassword(phpHandler, userToEditPassWord, newPassword);
  };
  return (
    <div
      className={`${
        isChangingPW
          ? "admin-manage-user-edit-password"
          : "admin-manage-user-edit-password isHidden"
      }`}
    >
      <div className="admin-manage-user-edit-password-pw">
        <label htmlFor="newPW">New password</label>
        <input
          type="text"
          name="newPW"
          id="newPW"
          values={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="admin-manage-user-edit-password-pw-inp"
        />
      </div>
      <div className="admin-manage-user-edit-password-btns">
        <button
          onClick={() => setIsChangingPW(false)}
          className="admin-manage-user-edit-password-btns-cancel"
        >
          Canel
        </button>
        <button
          onClick={handleEdit}
          className="admin-manage-user-edit-password-btns-confirm"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AdminEditPasswordModal;
