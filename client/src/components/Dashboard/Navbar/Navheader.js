import React, { useState, useContext } from "react";
import "./navheader.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Navwebview from "./Navwebview";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Navheader = (props) => {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      <div className="nav-dashboard-headear">
        <li>
          <GiHamburgerMenu size={25} onClick={props.data} />
        </li>
        <ul>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <li>{state && state.user && state.user.name}</li>
          {/* <li>{state.user._id}</li> */}

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
      </div>
    </>
  );
};

export default Navheader;
