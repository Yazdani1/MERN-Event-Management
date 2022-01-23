import React, { useState, useContext } from "react";
import { GiBlackball, GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { AiFillDashboard } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { BsHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiRamProfile } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";
import { UserContext } from "../../UserContext";
import "./MyeventsNavMobile.css";

const MyeventsNavMobile = () => {
  const [mobilesidebar, setMobilesidebar] = useState(false);

  const [state, setState] = useContext(UserContext);

  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    window.localStorage.removeItem("token");

    setState(null);
    history.push("/signin");
  };

  return (
    <div className="responsivenav">
      <div className="container-fluid mobile-view-header">
        <p>
          <GiHamburgerMenu
            size={25}
            onClick={() => setMobilesidebar(!mobilesidebar)}
          />
        </p>

        <p className="profile-name">{state && state.user && state.user.name}</p>

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
      </div>

      {mobilesidebar ? (
        <div className="mobile-nav">
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <AiFillDashboard size={20} /> Dashboard
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/create-event"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <RiEditFill size={15} /> Create Event
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/Dashboardprofile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <FaUserNurse size={15} /> Profile
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/AddExperience"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <GiSkills size={15} /> Experience
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/event-wishlist"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <BsHeartFill size={15} /> Wishlist
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/my-comments"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <MdQuestionAnswer size={15} /> Comments
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/message"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <AiFillMessage size={15} /> Messages
              </li>
            </div>
          </NavLink>

          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <AiTwotoneHome size={15} /> Home
              </li>
            </div>
          </Link>


          <div className="sidebar-mobile-nav" onClick={logOut}>
            <li onClick={() => setMobilesidebar(!mobilesidebar)}>
              <RiLogoutCircleRLine size={15} /> Log Out
            </li>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyeventsNavMobile;
