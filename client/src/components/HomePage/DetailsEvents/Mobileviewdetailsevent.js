import React, { useEffect, useState } from "react";
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


const Mobileviewdetailsevent = ({name,des,id,photo,username,date,startdate,enddate,location,maxmembers}) => {
  return (
    <React.Fragment>
      <div className="mobile-view-detailspage">
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
                  <p>
                    {username
                      ?.substring(0, 2)
                      .toUpperCase()}
                  </p>
                </div>
              )}

              <div className="profile-name-post-date">
                <p className="profile-name-size">
                  {username}
                </p>
                <p>
                  {moment(date).format(
                    "MMMM Do YYYY"
                  )}
                </p>
              </div>
            </div>
          </Link>


          <h5>{name}</h5>
          <p>{ReactHtmlParser(des)}</p>



          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-3">
              <p>
                Date:{" "}
                {moment(startdate).format(
                  "MMMM Do YYYY"
                )}
              </p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-3">
              <p>
                -
                {moment(enddate).format(
                  "MMMM Do YYYY"
                )}
                .
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-xl-3">
              <p className="event-locations">
                Location: <MdLocationPin style={{ color: "red" }} />{" "}
                {location}.
              </p>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xl-3">
              <p>Max seats: {maxmembers}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-xl-3">
              <p>
                {" "}
                Going <FcOk /> 10
              </p>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xl-3">
              <p>
                {" "}
                Interested <FcApproval /> 50
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Mobileviewdetailsevent;
