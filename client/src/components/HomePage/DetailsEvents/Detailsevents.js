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
import { Detailseventwebview } from "./Detailseventwebview";
import Moreevents from "./Moreevents";

const Detailsevents = () => {
  const { id } = useParams();

  const [detailsevents, setDetailsevents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDetailsevents = () => {
    getdetailsEvents(id)
      .then((detailsevent) => {
        setDetailsevents(detailsevent);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailsevents();
  }, [detailsevents]);

  if (loading) {
    return (
      <div class="text-center my-25">
        <h1>
          <SyncOutlined spin />
        </h1>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xl-8">
            <Detailseventwebview
              name={detailsevents && detailsevents?.singleevents?.name}
              des={detailsevents && detailsevents?.singleevents?.des}
              id={detailsevents && detailsevents?.singleevents?.postedBy?._id}
              photo={
                detailsevents && detailsevents?.singleevents?.postedBy?.photo
              }
              username={
                detailsevents && detailsevents?.singleevents?.postedBy?.name
              }
              date={detailsevents && detailsevents?.singleevents?.date}
              startdate={
                detailsevents && detailsevents?.singleevents?.startdate
              }
              enddate={detailsevents && detailsevents?.singleevents?.enddate}
              location={detailsevents && detailsevents?.singleevents?.location}
              maxmembers={
                detailsevents && detailsevents?.singleevents?.maxmembers
              }
            />
          </div>

          {/* small screen details view */}

          <Mobileviewdetailsevent
            name={detailsevents && detailsevents?.singleevents?.name}
            des={detailsevents && detailsevents?.singleevents?.des}
            id={detailsevents && detailsevents?.singleevents?.postedBy?._id}
            photo={
              detailsevents && detailsevents?.singleevents?.postedBy?.photo
            }
            username={
              detailsevents && detailsevents?.singleevents?.postedBy?.name
            }
            date={detailsevents && detailsevents?.singleevents?.date}
            startdate={detailsevents && detailsevents?.singleevents?.startdate}
            enddate={detailsevents && detailsevents?.singleevents?.enddate}
            location={detailsevents && detailsevents?.singleevents?.location}
            maxmembers={
              detailsevents && detailsevents?.singleevents?.maxmembers
            }
          />

          <div className="col-lg-4 col-md-12 col-sm-12 col-xl-4">
            <div className="card event-form-designs">
              <div className="text-center">
                <h5 className="text-center">Join this Event</h5>
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

        <div className="moreevents-design">
          <h5>More Events</h5>
          <Moreevents />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Detailsevents;
