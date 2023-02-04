import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Categories from "../components/Categories";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/collares" component={() => <Categories category="collares" />} />
    </Switch>
  </Router>
);

export default Routes;


