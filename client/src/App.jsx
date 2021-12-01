import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
        <Route />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
