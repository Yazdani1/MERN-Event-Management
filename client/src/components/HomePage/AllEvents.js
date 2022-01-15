import React, { useEffect, useState, useContext } from "react";
import "./Allevents.css";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { getallEvents } from "./APIAllevents";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import Pagination from "../Dashboard/Event/Pagination";
import Totalpostcount from "./TotalPostCount";

const AllEvents = () => {
  const [allevents, setAllevents] = useState([]);
  const [loading, setLoading] = useState(true);


  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allevents.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(allevents.length / postsPerPage);


  const loadallEvents = () => {
    getallEvents()
      .then((result) => {
        setAllevents(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallEvents();
  }, []);

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
      <Totalpostcount totalpost={allevents.length}/>
      <div className="container">
        <div className="row">
          {currentPosts.map((event, index) => (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="card all-events">
                <div className="profile-name-date">
                  {event?.postedBy?.photo ? (
                    <div className="profile-name-avatar-image">
                      <img src={event.postedBy?.photo} />
                    </div>
                  ) : (
                    <div className="profile-name-avatar">
                      <p>
                        {event.postedBy?.name.substring(0, 2).toUpperCase()}
                      </p>
                    </div>
                  )}

                  <div className="profile-name-post-date">
                    <p className="profile-name-size">{event.postedBy?.name}</p>
                    <p>{moment(event.date).format("MMMM Do YYYY")}</p>
                  </div>
                </div>
                <h5>{event.name}</h5>
                <p>{ReactHtmlParser(event.des?.substring(0, 350))}</p>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
                    <div className="events-date-and-place">
                      <p>
                        Date: {moment(event.startdate).format("MMMM Do YYYY")}
                      </p>
                      <p>-{moment(event.enddate).format("MMMM Do YYYY")}.</p>
                      <p className="event-location">
                        Location: {event.location}.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
                    <div className="event-seats-and-participate">
                      <p>Max seats: {event.maxmembers}</p>
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
          ))}
        </div>
        <div className="card pagination-allevents">
          {allevents.length > 1 ? (
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllEvents;
