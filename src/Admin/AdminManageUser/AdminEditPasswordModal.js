import React, { useState } from "react";
import { useGlobalContext } from "../../setup/Context";

export const handleEditPassword = async (phpHandler, userID, newPW) => {
  const url = phpHandler + `?getOldPasswordForUser=${userID}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get old password");
    console.log(data);
    if (data.password === newPW) throw new Error('Password is identical to old password')
    const sel = window.confirm('Are you sure about changing password?');
    if (!sel) throw new Error('Password change canceled');
    const prep = phpHandler + `?setNewPassWordForUser=${userID}&pw="${newPW}"`;
    const url2 = encodeURI(prep);
    try {
      const resp = await fetch(url2);
      const data2 = await resp.json();
      if (!data2) throw new Error("Failed to edit password");
      alert("Changed successfully");
    } catch (e) {
      alert(e);
    }
  } catch (e) {
    alert(e)
  };
}

const AdminEditPasswordModal = ({
  userToEditPassWord,
  setIsChangingPW,
  isChangingPW,
}) => {
  const { phpHandler } = useGlobalContext();
  const [newPassword, setNewPassword] = useState("");
  const handleEdit = () => {
    handleEditPassword(phpHandler, userToEditPassWord, newPassword);
    setIsChangingPW(false);
  };
  return (
    <div
      className={`${isChangingPW
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
