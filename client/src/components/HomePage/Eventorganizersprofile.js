import React, { useEffect, useState } from "react";
import { getallEventorganizers } from "./APIAllevents";
import moment from "moment";
import "./eventorganizersprofile.css";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "../Dashboard/Event/Pagination";
import { BsCalendar2DateFill } from "react-icons/bs";
import Totalpostcount from "./TotalPostCount";
import { SyncOutlined } from "@ant-design/icons";

const Eventorganizersprofile = () => {
  const [eventorganizers, setEventorganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  //for pagination state..

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = eventorganizers?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const howManyPages = Math.ceil(eventorganizers.length / postsPerPage);

  const loadallUser = () => {
    getallEventorganizers()
      .then((result) => {
        setEventorganizers(result);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallUser();
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
    <div className="container">
      <div className="row">
        {currentUsers.map((user, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-xl-3" key={index}>
            <div className="user-infocard card">
              {user && user.photo ? (
                <div className="user-profile-picture-image">
                  <img src={user && user.photo} />

                  <p>{user.name}</p>
                </div>
              ) : (
                <div className="profile-pic-and-name">
                  <div className="user-profile-pic">
                    <p>{user && user.name.substring(0, 2).toUpperCase()}</p>
                  </div>
                  <p>{user.name}</p>
                </div>
              )}

              <p>{moment(user.createdAt).format("MMMM Do YYYY")}</p>
              <div className="view-profile-button">
                <Link
                  to={"/userprofile/" + user._id}
                  style={{ textDecoration: "none" }}
                >
                  <span className="view-profile">View Profile</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card pagination-event-organizers">
        {eventorganizers.length > 1 ? (
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        ) : null}
      </div>
    </div>
  );
};

export default Eventorganizersprofile;
