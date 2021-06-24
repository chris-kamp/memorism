import React, { useState, useEffect } from "react";
import Deck from "./deck/Deck";
import Decks from "./Decks";
import { hot } from "react-hot-loader";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Topnav from "./topnav/Topnav";
import "../styles/style.css";
import FlashAlert from "./shared/FlashAlert";
import FlashError from "./shared/FlashError";

const Main = ({ user }) => {
  const [alerts, setAlerts] = useState([]);
  const pushAlert = (alert) => setAlerts([alert]);
  const clearAlerts = () => setAlerts([]);
  const [errors, setErrors] = useState([]);
  const pushError = (error) => setErrors([error]);
  const clearErrors = () => setErrors([]);
  const history = useHistory();

  // Clear alerts and errors on route change
  useEffect(() => {
    const unlisten = history.listen(() => {
      clearAlerts();
      clearErrors();
    });
    return () => {
      unlisten();
    };
  }, [history, setAlerts, setErrors]);

  return (
    <>
      <Topnav user={user} />
      <FlashError errors={errors} />
      <FlashAlert alerts={alerts} />
      <main style={{ padding: "0.5rem" }}>
        <Switch>
          <Route exact path="/">
            <Decks pushError={pushError} clearErrors={clearErrors} />
          </Route>
          <Route exact path="/decks">
            <Decks pushError={pushError} clearErrors={clearErrors} />
          </Route>
          <Route exact path="/decks/:id">
            <Deck
              pushAlert={pushAlert}
              clearAlerts={clearAlerts}
              pushError={pushError}
              clearErrors={clearErrors}
            />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Main;
