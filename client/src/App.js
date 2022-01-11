import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/Protectedroute";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";

import ResetPassword from "./components/auth/ResetPassword";
import NewPassword from "./components/auth/NewPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* route for client side */}
        <Route path="/" exact>
          <ProtectedRoute FrontProtected={Home} />
        </Route>

        <Route path="/signup">
          <ProtectedRoute FrontProtected={Signup} />
        </Route>

        <Route path="/signin">
          <ProtectedRoute FrontProtected={SignIn} />
        </Route>

        <Route exact path="/reset">
          <ProtectedRoute FrontProtected={ResetPassword} />
        </Route>

        <Route path="/reset/:token">
          <ProtectedRoute FrontProtected={NewPassword} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
