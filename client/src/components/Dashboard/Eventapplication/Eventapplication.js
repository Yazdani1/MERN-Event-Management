import "./Eventapplication.css";
import { geteventApplication } from "./APIeventapplication";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { MdLocationPin } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../UserContext";
import Mobileviewdetailsevent from "../../HomePage/DetailsEvents/Mobileviewdetailsevent";
import { Detailseventwebview } from "../../HomePage/DetailsEvents/Detailseventwebview";
import Pagination from "../Event/Pagination";

const Eventapplication = () => {
  const { id } = useParams();
  const [state, setState] = useContext(UserContext);

  const [eventapplication, setEventapplication] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = eventapplication?.application?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const howManyPages = Math.ceil(
    eventapplication?.application?.length / postsPerPage
  );

  const loadeventApplication = () => {
    geteventApplication(id)
      .then((result) => {
        setEventapplication(result);
        console.log("Event application is:" + result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadeventApplication();
  }, [eventapplication]);

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
        <Detailseventwebview
          name={eventapplication && eventapplication?.name}
          //   des={eventapplication && eventapplication?.des}
          id={eventapplication && eventapplication?.postedBy?._id}
          photo={eventapplication && eventapplication?.postedBy?.photo}
          username={eventapplication && eventapplication?.postedBy?.name}
          date={eventapplication && eventapplication?.date}
          startdate={eventapplication && eventapplication?.startdate}
          enddate={eventapplication && eventapplication?.enddate}
          location={eventapplication && eventapplication?.location}
          maxmembers={eventapplication && eventapplication?.maxmembers}
          postid={eventapplication && eventapplication?._id}
        />

        <Mobileviewdetailsevent
          name={eventapplication && eventapplication?.name}
          des={eventapplication && eventapplication?.des}
          id={eventapplication && eventapplication?.postedBy?._id}
          photo={eventapplication && eventapplication?.postedBy?.photo}
          username={eventapplication && eventapplication?.postedBy?.name}
          date={eventapplication && eventapplication?.date}
          startdate={eventapplication && eventapplication?.startdate}
          enddate={eventapplication && eventapplication?.enddate}
          location={eventapplication && eventapplication?.location}
          maxmembers={eventapplication && eventapplication?.maxmembers}
          postid={eventapplication && eventapplication?._id}
        />
        <p className="total-application">
          Total applications: {eventapplication.application?.length}
        </p>

        {eventapplication.application.map((eacheventapp) => (
          <>
            {eacheventapp.postedBy?._id === state.user._id ? (
              <>
                <p>{eacheventapp.name}</p>
                <p>{eacheventapp.email}</p>

              </>
            ) : null}
          </>
        ))}

        <div
          className="event-application"
          //   style={{ maxHeight: "550px", overflow: "scroll" }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              {currentPosts.map((application) => (
                <div className="event-application-views">
                  <div className="card all-events">
                    <Link
                      to={
                        "/organizers-public-profile/" +
                        application.postedBy?._id
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <div className="profile-name-date">
                        {application.postedBy?.photo ? (
                          <div className="profile-name-avatar-image">
                            <img src={application.postedBy?.photo} />
                          </div>
                        ) : (
                          <div className="profile-name-avatar">
                            <p>
                              {application.postedBy?.name
                                ?.substring(0, 2)
                                .toUpperCase()}
                            </p>
                          </div>
                        )}

                        <div className="profile-name-post-date">
                          <p className="profile-name-size">
                            {application.postedBy?.name}
                          </p>
                          <p>
                            {moment(application.date).format("MMMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <h5>{application.name}</h5>
                    <p>{application.email}</p>
                    <p>{application.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card pagination-dashboard">
            {eventapplication.application?.length > 1 ? (
              <Pagination
                pages={howManyPages}
                setCurrentPage={setCurrentPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Eventapplication;
