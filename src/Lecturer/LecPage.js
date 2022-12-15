import React from "react";
import LecContext from "./LecContext";
import LecSidebar from "./LecSidebar";

const LecPage = () => {
  return (
    <LecContext>
      <LecSidebar />
      <div className="lec-content">LecPage</div>
    </LecContext>
  );
};

export default LecPage;
