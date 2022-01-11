import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/Protectedroute";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <ProtectedRoute FrontProtected={Home} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
