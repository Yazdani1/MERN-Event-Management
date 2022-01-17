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
import Mobileviewdetailsevent from "./Mobileviewdetailsevent";

const Detailsevents = () => {
  const { id } = useParams();

  const [detailsevents, setDetailsevents] = useState([]);

  const loadDetailsevents = () => {
    getdetailsEvents(id)
      .then((detailsevent) => {
        setDetailsevents(detailsevent);
        console.log(detailsevent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailsevents();
  }, [detailsevents]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xl-8">
            <div className="details-webview">
              <div className="card all-events">
                <Link
                  to={
                    "/organizers-public-profile/" + detailsevents.postedBy?._id
                  }
                  style={{ textDecoration: "none" }}
                >
                  <div className="profile-name-date">
                    {detailsevents?.postedBy?.photo ? (
                      <div className="profile-name-avatar-image">
                        <img src={detailsevents.postedBy?.photo} />
                      </div>
                    ) : (
                      <div className="profile-name-avatar">
                        <p>
                          {detailsevents.postedBy?.name
                            ?.substring(0, 2)
                            .toUpperCase()}
                        </p>
                      </div>
                    )}

                    <div className="profile-name-post-date">
                      <p className="profile-name-size">
                        {detailsevents.postedBy?.name}
                      </p>
                      <p>
                        {moment(detailsevents && detailsevents.date).format(
                          "MMMM Do YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </Link>

                <h5>{detailsevents && detailsevents.name}</h5>
                <p>{ReactHtmlParser(detailsevents && detailsevents.des)}</p>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                    <div className="events-date-and-place">
                      <p>
                        Date:{" "}
                        {moment(
                          detailsevents && detailsevents.startdate
                        ).format("MMMM Do YYYY")}
                      </p>
                      <p>
                        -
                        {moment(detailsevents && detailsevents.enddate).format(
                          "MMMM Do YYYY"
                        )}
                        .
                      </p>
                      <p className="event-location">
                        Location: <MdLocationPin style={{ color: "red" }} />{" "}
                        {detailsevents && detailsevents.location}.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                    <div className="event-seats-and-participate">
                      <p>
                        Max seats: {detailsevents && detailsevents.maxmembers}
                      </p>
                      <div className="going-interested">
                        <p>
                          {" "}
                          Going <FcOk /> 10
                        </p>
                        <p>
                          {" "}
                          Interested <FcApproval /> 50
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* small screen details view */}
            <Mobileviewdetailsevent
              name={detailsevents && detailsevents.name}
              des={detailsevents && detailsevents.des}
              id={detailsevents && detailsevents.postedBy?._id}
              photo={detailsevents && detailsevents.postedBy?.photo}
              username={detailsevents && detailsevents.postedBy?.name}
              date={detailsevents && detailsevents && detailsevents.date}
              startdate={detailsevents && detailsevents.startdate}
              enddate={detailsevents && detailsevents.enddate}
              location={detailsevents && detailsevents.location}
              maxmembers={detailsevents && detailsevents.maxmembers}
            />
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 col-xl-4">
            <div className="card event-form-design">
              <div className="text-center">
                <h5 className="text-center">Create Your Event</h5>
              </div>
              {/* <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                Your post has been posted Successfully!
              </div>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div> */}
              <form>
                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Your name
                  </label>
                  <input
                    type="text"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    maxLength="100"
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Your E-mail
                  </label>
                  <input
                    type="text"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    maxLength="100"
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Number of participants
                  </label>
                  <input
                    type="number"
                    // value={maxmembers}
                    // onChange={(e) => setMaxmembers(e.target.value)}
                    className="form-control"
                    maxLength="100"
                  />
                </div>
                <div className="main_container-button">
                  <span className="view-allusers-button">Join Event</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Detailsevents;
