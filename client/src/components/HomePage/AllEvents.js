import React, { useEffect, useState, useContext } from "react";
import "./Allevents.css";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import {
  getallEvents,
  searchallEvents,
  addliketoEvent,
  unliketoEvent,
} from "./APIAllevents";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import Pagination from "../Dashboard/Event/Pagination";
import Totalpostcount from "./TotalPostCount";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import Alleventmobileview from "./Alleventmobileview";
import AlleventXLview from "./AlleventXLview";
import { UserContext } from "../UserContext";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const AllEvents = () => {
  const [allevents, setAllevents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [state, setState] = useContext(UserContext);
  const history = useHistory();

  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allevents?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(allevents?.length / postsPerPage);

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

  const searchEvents = () => {
    searchallEvents({ query: search })
      .then((searchresult) => {
        if (searchresult) {
          setAllevents(searchresult);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSearch("");
  };

  //like events

  const addLike = (postId) => {
    fetch("/api/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("clicked like" + result);
        const newItemData = allevents.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setAllevents(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikeevent = (postId) => {
    fetch("/api/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newItemData = allevents.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setAllevents(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //unlike events
  // const unLikeevent = (postId) => {
  //   unliketoEvent(postId)
  //     .then((result) => {
  //       const newItemData = allevents.map((item) => {
  //         if (item._id === result._id) {
  //           return result;
  //         } else {
  //           return item;
  //         }
  //       });

  //       setAllevents(newItemData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
                <span>{allevents.length} Events found</span>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4">
              <div className="eventorganizer-search">
                <p onClick={searchEvents}>Search</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* to test like */}

      {/* {allevents.map((event) => (
        <div className="container">
          <h5>New Post</h5>
          <div className="large-screen-allevent-view">
            <div className="card all-events">
              <Link
                to={"/organizers-public-profile/" + event.postedBy._id}
                style={{ textDecoration: "none" }}
              >
                <div className="profile-name-date">
                  {event.postedBy.photo ? (
                    <div className="profile-name-avatar-image">
                      <img src={event.postedBy.photo} />
                    </div>
                  ) : (
                    <div className="profile-name-avatar">
                      <p>
                        {event.postedBy.name?.substring(0, 2).toUpperCase()}
                      </p>
                    </div>
                  )}

                  <div className="profile-name-post-date">
                    <p className="profile-name-size">{event.name}</p>
                    <p>{moment(event.date).format("MMMM Do YYYY")}</p>
                  </div>
                </div>
              </Link>

              <Link
                to={"/event-details-page/" + event._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h5>{event.name}</h5>
                <p>{ReactHtmlParser(event.des?.substring(0, 350))}</p>
              </Link>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
                  <div className="events-date-and-place">
                    <p>
                      Start date:{" "}
                      {moment(event.startdate).format("MMMM Do YYYY")}
                    </p>
                    <p>-{moment(event.enddate).format("MMMM Do YYYY")}.</p>
                    <p className="event-location">
                      Location: <MdLocationPin style={{ color: "red" }} />{" "}
                      {event.location}.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
                  <div className="event-seats-and-participate">
                    <h5>{event.likes?.length}</h5>

                    {event.likes?.includes(state.user._id) ? (
                      <p
                        onClick={() => {
                          unLikeevent(event._id);
                        }}
                      >
                         <AiFillLike size={20} />
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          addLike(event._id);
                        }}
                      >
                        <AiOutlineLike size={20} />
                      </p>
                    )}

               

                    <p>Max seats: {event.maxmembers}</p>
                    <div className="going-interested">
                      <p>
                        {" "}
                        Going <FcOk /> {event.joinedeventnumbers}
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
        </div>
      ))} */}

      <div className="container">
        <div className="row">
          {allevents.length ? (
            currentPosts.map((event, index) => (
              //for large to medium screen

              <>
                {/* for mobiel escreen */}
                <Alleventmobileview
                  name={event.name}
                  des={event.des}
                  id={event.postedBy?._id}
                  photo={event?.postedBy?.photo}
                  username={event.postedBy?.name}
                  postid={event._id}
                  date={event.date}
                  startdate={event.startdate}
                  enddate={event.enddate}
                  location={event.location}
                  maxmembers={event.maxmembers}
                  includelikes={event.likes}
                  joinedeventnumbers={event.application.length}
                />

                {/* for extra large screen */}

                <AlleventXLview
                  name={event.name}
                  des={event.des}
                  id={event.postedBy?._id}
                  photo={event?.postedBy?.photo}
                  username={event.postedBy?.name}
                  postid={event._id}
                  date={event.date}
                  startdate={event.startdate}
                  enddate={event.enddate}
                  location={event.location}
                  maxmembers={event.maxmembers}
                  joinedeventnumbers={event.application.length}
                  totallikes={event.likes.length}
                  alreadylikedpost={event.likes}
                  addlike={addLike}
                  unlike={unLikeevent}
                />
              </>
            ))
          ) : (
            <h5 className="card">No search result found with your query</h5>
          )}
        </div>
        <div className="card pagination-allevents">
          {allevents.length > 8 ? (
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllEvents;
