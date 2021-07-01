import React, { useState, useEffect } from "react";
import Deck from "./decks/Deck";
import Decks from "./decks/Decks";
import { hot } from "react-hot-loader";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Topnav from "./topnav/Topnav";
import "../styles/style.css";
import FlashAlert from "./alerts/FlashAlert";
import FlashError from "./alerts/FlashError";
import Review from "./review/Review";

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
      <main style={{ padding: "0.5rem", width: "100%" }}>
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
              user={user}
            />
          </Route>
          <Route exact path="/decks/:id/review">
            <Review
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
