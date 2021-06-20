import React from "react";
import { Route, Switch } from "react-router-dom";
import Deck from "./Deck";
import Decks from "./Decks";
import { hot } from "react-hot-loader";

const App = () => {
  return (
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
  );
};

export default App;
