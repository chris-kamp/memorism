import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/style.css";
import Main from "./Main";

const App = ({ user }) => {
  return (
    <>
      <Router>
        <Main user={user} />
      </Router>
    </>
  );
};

export default App;
