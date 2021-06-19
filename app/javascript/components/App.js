import React from "react";
import { Route, Switch } from "react-router-dom";
import Deck from "./Deck";
import Decks from "./Decks";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Decks />
      </Route>
      <Route exact path="/decks/:id">
        <Deck />
      </Route>
    </Switch>
  );
};

export default App;
