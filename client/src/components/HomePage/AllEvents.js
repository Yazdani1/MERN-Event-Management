import React, { useEffect, useState, useContext } from "react";
import "./Allevents.css";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { getallEvents, searchallEvents } from "./APIAllevents";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import Pagination from "../Dashboard/Event/Pagination";
import Totalpostcount from "./TotalPostCount";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import Alleventmobileview from "./Alleventmobileview";
import AlleventXLview from "./AlleventXLview";

const AllEvents = () => {
  const [allevents, setAllevents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allevents?.slice(indexOfFirstPost, indexOfLastPost);
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
