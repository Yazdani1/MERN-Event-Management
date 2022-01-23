import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { AiFillDashboard } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { Link, useHistory } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiRamProfile } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";
import { UserContext } from "../../UserContext";
import MyeventsNavMobile from "./MyeventsNavMobile";

import "./MyeventsNavweb";

const MyeventsNavweb = (props) => {
  const [state, setState] = useContext(UserContext);

  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    window.localStorage.removeItem("token");

    setState(null);
    history.push("/signin");
  };

  return (
    <div>
      {props.sidebar ? (
        <div className="sidebar-small-design">
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  {/* <AiFillHome size={20} onClick={() => setSidebar(!sidebar)} /> */}
                  <AiFillDashboard size={20} />
                </span>

                <p>Dashboard</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/create-event"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <RiEditFill size={20} />
                </span>

                <p>Create Event</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/Dashboardprofile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <FaUserNurse size={20} />
                </span>

                <p>Profile</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/AddExperience"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <GiSkills size={20} />
                </span>

                <p>Experience</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/event-wishlist"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <BsHeartFill size={20} />
                </span>

                <p>Wishlist</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/my-comments"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <MdQuestionAnswer size={20} />
                </span>

                <p>Comments</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/message"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <AiFillMessage size={20} />
                </span>

                <p>Messages</p>
              </div>
            </div>
          </NavLink>

     
          <div className="sidebar-item-back">
            <div className="sidebar-items" onClick={logOut}>
              <span>
                <RiLogoutCircleRLine size={20} />
              </span>

              <p>Log Out</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar-large">
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <AiFillDashboard size={15} /> Dashboard
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/create-event"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <RiEditFill size={15} />
                Create Event
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/Dashboardprofile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <FaUserNurse size={15} /> Profile
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/AddExperience"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <GiSkills size={15} /> Experience
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/event-wishlist"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <BsHeartFill size={15} /> Wishlist
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/my-comments"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <MdQuestionAnswer size={15} /> My Comments
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/message"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <AiFillMessage size={15} /> Messages
              </p>
            </div>
          </NavLink>

          <div className="sidebar-large-navdesign" onClick={logOut}>
            <p>
              <AiOutlineLogout size={15} /> Log Out
            </p>
          </div>
        </div>
      )}

      <MyeventsNavMobile />
    </div>
  );
};

export default MyeventsNavweb;
