import React, {useState, useEffect} from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/style.css";
import Main from "./Main";

const App = ({ user: userObj }) => {
  // Initialise "user" state
  const [user, setUser] = useState(null);

  // Parse Rails user object from JSON
  useEffect(() => {
    setUser(JSON.parse(userObj));
  }, [userObj])

  return (
    <>
      <Router>
        <Main user={user} />
      </Router>
    </>
  );
};

export default App;
