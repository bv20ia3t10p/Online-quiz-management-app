import React, { useEffect, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineKey,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../setup/Context";
import AddNewUserModal from "./AddNewUserModal";
import AdminEditPasswordModal from "./AdminEditPasswordModal";
import { handleSearch } from "../AdminManageExam/AdminManageExamActions";

const getListOfUsers = async (phpHandler, setUsers) => {
  const url = phpHandler + `?getListOfUsersForAdmin`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get list of student");
    setUsers({ users: data, backUp: data });
  } catch (e) {
    alert(e);
  }
};

const deleteUserOffDB = async (
  phpHandler,
  userToDelete,
) => {
  const url = phpHandler + `?deleteUserOffDB=${userToDelete}`;
  try {
    const conf = window.confirm('Are you sure to delete?');
    // if (!conf) return;
    if (!conf) throw new Error('Delete canceled');
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to delete user");
    alert('Delete success')
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

const AdminManageUser = () => {
  const { phpHandler } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState({ users: [], backUp: {} });
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isChangingPW, setIsChangingPW] = useState(false);
  const navi = useNavigate();
  const handleEdit = () => {
    if (users.users[selected].id[0] === "2") {
      navi(`/Admin/Student/${users.users[selected].id}`);
    } else if (users.users[selected].id[0] === "8") {
      navi(`/Admin/Lecturer/${users.users[selected].id}`);
    } else if (users.users[selected].id[0] === "9") {
      navi(`/Admin/About/${users.users[selected].id}`);
    } else alert("Invalid selection");
  };
  const handleChangePW = () => {
    setIsChangingPW(true);
  };
  const handleDelete = () => {
    deleteUserOffDB(phpHandler, users.users[selected].id, setUsers, users);
  };
  useEffect(() => {
    if (isLoading) {
      getListOfUsers(phpHandler, setUsers);
      setIsLoading(false);
    } else return;
  }, [users, isLoading, phpHandler]);
  if (isLoading) return <div className="admin-manage-user">Is loading</div>;
  return (
    <>
      {users.users[selected] && (
        <AdminEditPasswordModal
          userToEditPassWord={users.users[selected].id}
          isChangingPW={isChangingPW}
          setIsChangingPW={setIsChangingPW}
        />
      )}
      <AddNewUserModal isAdding={isAdding} setIsAdding={setIsAdding} />
      <div className="admin-manage-user">
        <div className="admin-manage-user-list-title">
          List of users in the system
        </div>
        <div className="admin-manage-user-list-btns">
          <div
            className="admin-manage-user-list-btns-create"
            onClick={() => setIsAdding(true)}
          >
            <AiOutlineUserAdd className="admin-manage-user-list-btns-add-icon icon" />
            Add new user
          </div>
          <div
            onClick={handleDelete}
            className="admin-manage-user-list-btns-delete"
          >
            <AiOutlineUserDelete className="admin-manage-user-list-btns-delete-icon icon" />
            Remove selected user
          </div>
          <div
            onClick={handleChangePW}
            className="admin-manage-user-list-btns-edit-pw"
          >
            <AiOutlineKey className="admin-manage-user-list-btns-edit-pw-icon icon" />
            Change password
          </div>
          <div onClick={handleEdit} className="admin-manage-user-list-edit">
            <AiOutlineEdit className="admin-manage-user-list-btns-edit-icon icon" />
            Edit personal information
          </div>
        </div>
        <div className="admin-manage-user-list">
          <form
            className="admin-manage-user-list-search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(users, search, setUsers);
              console.log('Got');
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-manage-user-list-search-inp"
              placeholder="Enter search value or leave blank to get original list back"
            />
            <button className="admin-manage-user-list-search-btn" type="submit">
              <AiOutlineSearch className="admin-manage-user-list-search-icon icon" />
            </button>
          </form>
          <div className="admin-manage-user-list-heading">
            {["ID", "Password", "Role", "Name"].map((n, index) => {
              return (
                <span
                  key={index}
                  className="admin-manage-suer-list-heading-value"
                >
                  {n}
                </span>
              );
            })}
          </div>
          <div className="admin-manage-user-list-values">
            {users.users.map((n, index) => {
              return (
                <div
                  key={index}
                  className={`${index === selected
                    ? "admin-manage-user-list-singlet isSelected"
                    : "admin-manage-user-list-singlet"
                    }`}
                  onClick={() => setSelected(index)}
                >
                  {Object.values(n).map((n2, index2) => {
                    return (
                      <span
                        className="admin-manage-suer-list-singlet-value"
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
    </>
  );
};

export default AdminManageUser;
