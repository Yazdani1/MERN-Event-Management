import React, { useEffect, useState } from "react";
import { getallEventorganizers, eventorganizerProfile } from "./APIAllevents";
import moment from "moment";
import "./eventorganizersprofile.css";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "../Dashboard/Event/Pagination";
import { BsCalendar2DateFill } from "react-icons/bs";
import Totalpostcount from "./TotalPostCount";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { GiArchiveResearch } from "react-icons/gi";

import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";

const Eventorganizersprofile = () => {
  const [eventorganizers, setEventorganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  // const [searchresult, setSearchresult] = useState([]);

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
  const howManyPages = Math.ceil(eventorganizers?.length / postsPerPage);

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

  //this to get search without button click
  // const searchUser = (query) => {
  //   setSearch(query);
  //   fetch("/api/search-eventorganizers", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       query,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((searchresult) => {
  //       console.log(searchresult.usersearchrecord);
  //       setSearchresult(searchresult.usersearchrecord);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const searchUser = () => {
    eventorganizerProfile({ query: search })
      .then((searchresult) => {
        setEventorganizers(searchresult.usersearchrecord);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setSearch("");
  };

  useEffect(() => {
    loadallUser();
  }, []);

  // const [star, setStar] = useState(null);

  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  //   setStar(newRating);
  // };

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
      <div className="container  search-container">
        <div className="card">
          <div className="row ">
            <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8">
              <div className="eventorganizer-search">
                <form>
                  <div className="event-form">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="form-control"
                      maxLength="100"
                      placeholder="search event organizers name.."
                    />
                  </div>
                </form>
                <span>{eventorganizers.length} Users found</span>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4">
              <div className="eventorganizer-search">
                <p onClick={searchUser}>Search</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {eventorganizers.length ? (
            currentUsers.map((user, index) => (
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
                      to={"/organizers-public-profile/" + user._id}
                      style={{ textDecoration: "none" }}
                    >
                      <span className="view-profile">View Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container">
              <h5 className="card noposts-design">
                <GiArchiveResearch size={200} />
                No search result found with your query! Please try a different
                search query
              </h5>
            </div>
          )}
        </div>

        <div className="card pagination-event-organizers">
          {eventorganizers.length > 1 ? (
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          ) : null}
        </div>
        {/* <div className="container">
        <h5>{star}</h5>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
          activeColor="#ffd700"
        />
        
      </div> */}
      </div>
      <ToastContainer autoClose={8000} />
    </React.Fragment>
  );
};

export default Eventorganizersprofile;
