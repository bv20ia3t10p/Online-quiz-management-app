import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminContext from "./AdminContext";

const AdminPage = ({ children }) => {
  return (
    <AdminContext>
      <AdminSideBar />
      <div className="admin-container">{children}</div>
    </AdminContext>
  );
};

export default AdminPage;
