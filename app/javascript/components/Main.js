import React, { useState, useEffect } from "react";
import Deck from "./deck/Deck";
import Decks from "./Decks";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Topnav from "./topnav/Topnav";
import "../styles/style.css";
import Alert from "./shared/Alert";

const Main = ({ user }) => {
  const [alerts, setAlerts] = useState([]);
  const pushAlert = (alert) => setAlerts([...alerts, alert]);
  const clearAlerts = () => setAlerts([]);
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (alerts.length > 0) {
        setAlerts([]);
      }
    });
    return () => {
      unlisten();
    };
  }, [history, setAlerts]);

  return (
    <>
      <Topnav user={user} />
      <Alert alerts={alerts} />
      <main style={{ padding: "0.5rem" }}>
        <Switch>
          <Route exact path="/">
            <Decks />
          </Route>
          <Route exact path="/decks/:id">
            <Deck pushAlert={pushAlert} clearAlerts={clearAlerts} />
          </Route>
          <Route exact path="/decks">
            <Decks />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Main;
