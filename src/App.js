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
import "./Student/stuSideBar.css";
import "./Student/stuSelectClass.css";
import "./navBar.css";
import "./login.css";
import StuInfo from "./Student/StuInfo/StuInfo";
import Navbar from "./Navbar";
import StudentHome from "./Student/StudentHome";

const app = () => {
  return (
    <Context>
      <Router>
        <Navbar />
        <Switch>
          <Route path="Student">
            <Route path="about/:sid" element={<StuInfo />} />
            <Route
              path="Home"
              element={
                <StudentPage>
                  <StudentHome />
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
      </Router>
    </Context>
  );
};

export default app;
