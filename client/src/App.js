import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import ProtectedRoute from "./components/Protectedroute";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
import { UserProvider } from "./components/UserContext";
import ResetPassword from "./components/auth/ResetPassword";
import NewPassword from "./components/auth/NewPassword";
import DashboardprotectedRoute from "./components/Dashboard/DashboardprotectedRoute";
import Dashboard from "./components/Dashboard/Event/Dashboard";
import CreateEvent from "./components/Dashboard/Event/CreateEvent";
import Eventorganizersprofile from "./components/HomePage/Eventorganizersprofile";
import UserPublicProfile from "../src/components/HomePage/Userinfo/UserPublicProfile";

const App = () => {
  return (
    <UserProvider>
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

          <Route exact path="/reset/:token">
            <ProtectedRoute FrontProtected={NewPassword} />
          </Route>

          <Route exact path="/event-organizers-profile">
            <ProtectedRoute FrontProtected={Eventorganizersprofile} />
          </Route>
          <Route exact path="/organizers-public-profile/:id">
            <ProtectedRoute FrontProtected={UserPublicProfile} />
          </Route>

          {/* Protected route for admin side */}

          <Route exact path="/dashboard">
            <DashboardprotectedRoute DashboardProtect={Dashboard} />
          </Route>

          <Route exact path="/create-event">
            <DashboardprotectedRoute DashboardProtect={CreateEvent} />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
