import React, { useEffect, useState } from "react";
import { getallUsers } from "./APIAllevents";
import moment from "moment";
import "./userlist.css";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "../Dashboard/Event/Pagination";
import { BsCalendar2DateFill } from "react-icons/bs";
import Totalpostcount from "./TotalPostCount";

const UserList = () => {
  const [alluser, setAlluser] = useState([]);

  //for pagination state..

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(12);

  //Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentUsers = alluser.slice(indexOfFirstPost, indexOfLastPost);
  // const howManyPages = Math.ceil(alluser.length / postsPerPage);

  const loadallUser = () => {
    getallUsers()
      .then((result) => {
        setAlluser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallUser();
  }, []);

  return (
    <div className="container">

      <div className="row">
        {alluser.map((user, index) => (
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
      <Link to={"/event-organizers-profile"} style={{ textDecoration: "none" }}>
        <div className="main_container-button">
          <span className="view-allusers-button">
            View All Event Organizers
          </span>
        </div>
      </Link>

      {/* <div className="card pagination-user-list">
        {alluser.length > 1 ? (
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        ) : (
          "No Posts so far"
        )}
      </div> */}
    </div>
  );
};
export default UserList;
