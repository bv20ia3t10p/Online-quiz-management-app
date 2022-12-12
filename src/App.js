import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Login from "./Login/Login";
import { Context } from "./setup/Context";
import StudentPage from "./Student/StudentPage";
import StuExamPage from "./Student/stuExam/StuExamPage";
import StudentSidebar from "./Student/StudentSidebar";
import "./sideBar.css";
import "./navBar.css";
import "./login.css";

import StuInfo from "./Student/StuInfo/StuInfo";
import Navbar from "./Navbar";

const app = () => {
  return (
    <Context>
      <Router>
        <Navbar />
        <div className="grid grid-cols-12 grid-rows-6">
          <Switch>
            <Route path="Student">
              <Route path="about/:sid" element={<StuInfo />} />
              <Route
                path="Home"
                element={
                  <StudentPage>
                    <StudentSidebar />
                  </StudentPage>
                }
              />
              <Route
                path="Exam"
                element={
                  <StudentPage>
                    <StuExamPage />
                  </StudentPage>
                }
              />
            </Route>
            <Route exact path="/" element={<Login />}></Route>
          </Switch>
        </div>
      </Router>
    </Context>
  );
};

export default app;
