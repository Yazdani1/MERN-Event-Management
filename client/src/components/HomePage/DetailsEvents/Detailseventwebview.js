import React, { useEffect, useState, useContext } from "react";
import "./detailsevents.css";
import { getdetailsEvents } from "./APIDetails";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { UserContext } from "../../UserContext";
import { BsFillBookmarkStarFill } from "react-icons/bs";

export const Detailseventwebview = ({
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
  joinedeventnumbers,
  postid,

  totallikes,
  alreadylikedpost,
  addlike,
  unlike,
  saveWishlist,
}) => {
  const [state, setState] = useContext(UserContext);
  const history = useHistory();

  return (
    <React.Fragment>
      <div className="details-webview">
        <div className="card single-events">
          
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
            <p>{ReactHtmlParser(des)}</p>
          </Link>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="events-date-and-place">
                <p>Date: {moment(startdate).format("MMMM Do YYYY")}</p>
                <p>-{moment(enddate).format("MMMM Do YYYY")}.</p>
                <p className="event-location">
                  Location: <MdLocationPin style={{ color: "red" }} />{" "}
                  {location}.
                </p>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="event-seats-and-participate">
                <p>Max seats: {maxmembers}</p>
                <div className="going-interested">
                  <p>
                    {" "}
                    Going <FcOk /> {joinedeventnumbers}
                  </p>
                </div>

                <div className="going-interested">
                  {alreadylikedpost?.includes(
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
