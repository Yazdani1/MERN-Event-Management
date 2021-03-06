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
import JoinedEventsRoute from "./components/Joinedevents/JoinedEventsRoute";
import JoinedEvents from "./components/Joinedevents/JoinedEvents";
import Detailsevents from "./components/HomePage/DetailsEvents/Detailsevents";
import Eventapplication from "./components/Dashboard/Eventapplication/Eventapplication";
import EventTickets from "./components/Joinedevents/EventTickets";
import { UserInfoProvider } from "./components/UserInfoContext";
import Message from "./components/Dashboard/Event/Message";
import Wishlist from "./components/Joinedevents/Event Wishlist/Wishlist";
import PagenotFound from "./components/PagenotFound";
import Profile from "./components/Dashboard/Profile/Profile";

const App = () => {
  return (
    <UserInfoProvider>
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

            <Route exact path="/event-organizers">
              <ProtectedRoute FrontProtected={Eventorganizersprofile} />
            </Route>
            <Route exact path="/organizers-public-profile/:id">
              <ProtectedRoute FrontProtected={UserPublicProfile} />
            </Route>

            <Route exact path="/event-details-page/:id">
              <ProtectedRoute FrontProtected={Detailsevents} />
            </Route>

            {/* Protected route for create event side */}

            <Route exact path="/dashboard">
              <DashboardprotectedRoute DashboardProtect={Dashboard} />
            </Route>

            <Route exact path="/create-event">
              <DashboardprotectedRoute DashboardProtect={CreateEvent} />
            </Route>

            <Route exact path="/message">
              <DashboardprotectedRoute DashboardProtect={Message} />
            </Route>

            <Route exact path="/profile">
              <DashboardprotectedRoute DashboardProtect={Profile} />
            </Route>

            <Route exact path="/event-application/:id">
              <DashboardprotectedRoute DashboardProtect={Eventapplication} />
            </Route>
            {/* Protected end route for create event side */}

            {/* Protected route for joined  event side */}
            <Route exact path="/joined-events">
              <JoinedEventsRoute JoinedevenRouteprotect={JoinedEvents} />
            </Route>

            <Route exact path="/event-wishlist">
              <JoinedEventsRoute JoinedevenRouteprotect={Wishlist} />
            </Route>

            <Route exact path="/event-tickets/:id">
              <JoinedEventsRoute JoinedevenRouteprotect={EventTickets} />
            </Route>

            {/* Protected route end for joined  event side */}

            {/* page not found  */}

            <Route path="*" exact component={PagenotFound} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </UserInfoProvider>
  );
};

export default App;
