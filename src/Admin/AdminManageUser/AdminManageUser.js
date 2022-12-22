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

const getListOfUsers = async (phpHandler, setUsers, setBackUp) => {
  const url = phpHandler + `?getListOfUsersForAdmin`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to get list of student");
    setUsers(data);
    setBackUp({
      isBackedUp: true,
      users: data,
    });
  } catch (e) {
    alert(e);
  }
};

const deleteUserOffDB = async (
  phpHandler,
  userToDelete,
  setUsers,
  users,
  setBackUp
) => {
  const url = phpHandler + `?deleteUserOffDB=${userToDelete}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Failed to delete user");
    const newUsers = users.filter((n) => n.id !== userToDelete);
    setUsers(newUsers);
    setBackUp({ isBackedUp: true, users: newUsers });
  } catch (e) {
    alert(e);
  }
};

const AdminManageUser = () => {
  const { phpHandler } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [backUp, setBackUp] = useState({ isBackedUp: false, users: [] });
  const [isChangingPW, setIsChangingPW] = useState(false);
  const navi = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) {
      setUsers(backUp.users);
    } else {
      const newUsers = [];
      users.forEach((n) => {
        if (
          Object.values(n).find(
            (n2) => n2 && n2.toUpperCase().includes(search.toUpperCase())
          )
        )
          newUsers.push(n);
      });
      setUsers(newUsers);
    }
  };
  const handleEdit = () => {
    if (users[selected].id[0] === "2") {
      navi(`/Admin/Student/${users[selected].id}`);
    } else if (users[selected].id[0] === "8") {
      navi(`/Admin/Lecturer/${users[selected].id}`);
    } else if (users[selected].id[0] === "9") {
      navi(`/Admin/About/${users[selected].id}`);
    } else alert("Invalid selection");
  };
  const handleChangePW = () => {
    setIsChangingPW(true);
  };
  const handleDelete = () => {
    deleteUserOffDB(phpHandler, users[selected].id, setUsers, users, setBackUp);
  };
  useEffect(() => {
    if (!users.length) {
      getListOfUsers(phpHandler, setUsers, setBackUp);
      setIsLoading(false);
    } else return;
  }, [users, isLoading, phpHandler]);
  if (isLoading) return <div className="admin-manage-user">Is loading</div>;
  return (
    <>
      {users[selected] && (
        <AdminEditPasswordModal
          userToEditPassWord={users[selected].id}
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
            onSubmit={handleSearch}
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
            {users.map((n, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index === selected
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
