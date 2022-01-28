import React, { useState, useContext } from "react";
// import { UserContext } from "../UserContext";
import "./navmobilefront.css";
import "./navwebfront.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiTwotoneHome } from "react-icons/ai";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../UserContext";
import { FaPiedPiperSquare } from "react-icons/fa";



const Navmobileviewfront = () => {
  const [mobilesidebar, setMobilesidebar] = useState(false);

  const [state, setState] = useContext(UserContext);

  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    setState(null);
    history.push("/signin");
  };

  return (
    <div className="responsivenav-for-frontclient">
      <div className="container-fluid mobile-view-header">
        <p>
          <GiHamburgerMenu
            size={25}
            onClick={() => setMobilesidebar(!mobilesidebar)}
          />
        </p>

        {window.localStorage.getItem("tokenLogin") ? (
          <>
            <p className="profile-name">
              {state && state.user && state.user.name}
            </p>

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
          </>
        ) : null}
      </div>

      {mobilesidebar ? (
        <div className="mobile-nav">
          {window.localStorage.getItem("tokenLogin") ? (
            <>
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="sidebar-mobile-nav">
                  <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                    <AiTwotoneHome size={20} /> Home
                  </li>
                </div>
              </Link>

              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <div className="sidebar-mobile-nav">
                  <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                    <AiFillDashboard size={20} /> Create Events
                  </li>
                </div>
              </Link>

              <Link to="/joined-events" style={{ textDecoration: "none" }}>
                <div className="sidebar-mobile-nav">
                  <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                    <FaPiedPiperSquare size={20} /> My Events
                  </li>
                </div>
              </Link>

              <div className="sidebar-mobile-nav" onClick={logOut}>
                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <RiLogoutCircleRLine size={15} /> Log Out
                </li>
              </div>
            </>
          ) : (
            <>
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="sidebar-mobile-nav">
                  <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                    <AiTwotoneHome size={20} /> Home
                  </li>
                </div>
              </Link>

              <Link to="/signup" style={{ textDecoration: "none" }}>
                <div className="sidebar-mobile-nav">
                  <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                    <RiAccountPinBoxFill size={20} /> Sign Up
                  </li>
                </div>
              </Link>

              <Link to="/signin" style={{ textDecoration: "none" }}>
                <div className="sidebar-mobile-nav">
                  <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                    <RiAccountPinCircleFill size={20} /> Sign In
                  </li>
                </div>
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Navmobileviewfront;
