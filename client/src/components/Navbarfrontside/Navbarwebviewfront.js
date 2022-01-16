import React, { useState, useContext } from "react";
import "./navmobilefront.css";
import "./navwebfront.css";
import { Link, NavLink } from "react-router-dom";
import Navmobileviewfront from "./Navmobileviewfront";
import { UserContext } from "../UserContext";

const Navbarwebviewfront = () => {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      <div className="nav-dashboard-front">
        {state && state.token ? (
          <>
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <li>Home</li>
              </Link>
              <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                <li>Create Events</li>
              </Link>
              <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                <li>My Events</li>
              </Link>
              <li>{state && state.user && state.user.name}</li>

              <div className="profile-image">
                {state && state.user && state.user.photo ? (
                  <img src={state && state.user && state.user.photo} />
                ) : (
                  <div className="profile-nave-avatar">
                    <h4>
                      {state &&
                        state.user &&
                        state.user.name?.substring(0, 2).toUpperCase()}
                    </h4>
                  </div>
                )}
              </div>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <li>Home</li>
              </Link>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "activenav-front" : "inactive"
                }
              >
                <li>Sign Up</li>
              </Link>
              <Link
                to={"/signin"}
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "activenav-front" : "inactive"
                }
              >
                <li>Sign In</li>
              </Link>
            </ul>
          </>
        )}
      </div>
      <Navmobileviewfront />
    </>
  );
};

export default Navbarwebviewfront;
