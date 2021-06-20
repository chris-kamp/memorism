import React from "react";
import Deck from "./deck/Deck";
import Decks from "./Decks";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topnav from "./topnav/Topnav";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({user}) => {
  return (
    <>
      <Router>
        <Topnav user={user} />
        <Switch>
          <Route exact path="/">
            <Decks />
          </Route>
          <Route exact path="/decks/:id">
            <Deck />
          </Route>
          <Route exact path="/decks">
            <Decks />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
