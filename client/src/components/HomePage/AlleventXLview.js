import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { MdLocationPin } from "react-icons/md";
import "./Allevents.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { UserContext } from "../UserContext";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { UserInfoContext } from "../UserInfoContext";

const AlleventXLview = ({
  name,
  des,
  id,
  photo,
  username,
  date,
  startdate,
  enddate,
  location,
  maxmembers,
  postid,
  joinedeventnumbers,
  totallikes,
  alreadylikedpost,
  addlike,
  unlike,
  saveWishlist,
}) => {
  const [state, setState] = useContext(UserContext);
  const history = useHistory();

  //user info context

  const [userinfo, setUserinfo] = useContext(UserInfoContext);

  return (
    <React.Fragment>
      <div className="large-screen-allevent-view">
        <div className="card all-events">
          <Link
            to={"/organizers-public-profile/" + id}
            style={{ textDecoration: "none" }}
          >
            <div className="profile-name-date">
              {photo ? (
                <div className="profile-name-avatar-image">
                  <img src={photo} />
                </div>
              ) : (
                <div className="profile-name-avatar">
                  <p>{username?.substring(0, 2).toUpperCase()}</p>
                </div>
              )}

              <div className="profile-name-post-date">
                <p className="profile-name-size">{username}</p>
                <p>{moment(date).format("MMMM Do YYYY")}</p>
              </div>
              {joinedeventnumbers >= 2 ? (
                <p className="trending">Trending</p>
              ) : null}
            </div>
          </Link>

          <Link
            to={"/event-details-page/" + postid}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h5>{name}</h5>
            <p>{ReactHtmlParser(des?.substring(0, 350))}</p>
          </Link>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
              <div className="events-date-and-place">
                <p>Start date: {moment(startdate).format("MMMM Do YYYY")}</p>
                {/* <p>-{moment(enddate).format("MMMM Do YYYY")}.</p> */}
                <p className="event-location">
                  Location: <MdLocationPin style={{ color: "red" }} />{" "}
                  {location}.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
              <div className="event-seats-and-participate">
                <div className="going-interested">
                  {alreadylikedpost.includes(
                    state && state.user && state.user._id
                  ) ? (
                    <p
                      onClick={() => {
                        unlike(postid);
                      }}
                    >
                      <AiFillLike size={20} />
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        if (!localStorage.getItem("tokenLogin")) {
                          history.push("/signin");
                        } else {
                          addlike(postid);
                        }
                      }}
                    >
                      <AiOutlineLike size={20} />
                    </p>
                  )}
                </div>

                <div className="going-interested">
                  <p>{totallikes} Likes </p>
                </div>

                <div className="going-interested">
                  <p>Max seats: {maxmembers}</p>
                </div>

                <div className="going-interested">
                  <p>
                    Going <FcOk /> {joinedeventnumbers}
                  </p>
                </div>

                <div className="going-interested">
                  <p
                    onClick={() => {
                      if (!localStorage.getItem("tokenLogin")) {
                        history.push("/signin");
                      } else {
                        saveWishlist(postid);
                      }
                    }}
                  >
                    Save <BsFillBookmarkStarFill />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AlleventXLview;
