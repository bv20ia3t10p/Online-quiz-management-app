import React from "react";
import LecContext from "./LecContext";
import LecSidebar from "./LecSidebar";

const LecPage = ({ children }) => {
  return (
    <LecContext>
      <LecSidebar />
      <div className="lec-content">{children}</div>
    </LecContext>
  );
};

export default LecPage;
