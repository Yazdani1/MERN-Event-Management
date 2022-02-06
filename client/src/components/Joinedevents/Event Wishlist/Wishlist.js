import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { SyncOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserInfoContext } from "../../UserInfoContext";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { MdLocationPin, MdDelete } from "react-icons/md";
import {
  removeeventfromWishlist,
  getwishlistPost,
} from "../Event Wishlist/APIwishlist";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../Dashboard/Event/Pagination";

const Wishlist = () => {
  const [userinfo, setUserinfo] = useContext(UserInfoContext);

  //load wishlist post

  const [getwishlist, setGetwishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = getwishlist?.wishlist?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const howManyPages = Math.ceil(getwishlist?.wishlist?.length / postsPerPage);

  const removeEventwishlist = (postID) => {
    removeeventfromWishlist(postID)
      .then((result) => {
        if (result) {
          toast.success("This event has been removed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get all wish list

  const loadwishlistPost = () => {
    getwishlistPost()
      .then((resultwishlist) => {
        if (resultwishlist) {
          setGetwishlist(resultwishlist);
          console.log("All wishlist"+resultwishlist)
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadwishlistPost();
  }, [userinfo, setUserinfo]);

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
      <div className="container large-screen-allevent-views">
        <p className="total-application">
          Wishlist Events: {getwishlist.wishlist?.length}
        </p>
        {currentPosts?.map((eventwish) => (
          <>
            <div className="card all-events">
              <Link
                to={"/event-details-page/" + eventwish._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h5>{eventwish.name}</h5>
                <p>{ReactHtmlParser(eventwish.des?.substring(0, 350))}</p>
              </Link>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
                  <div className="events-date-and-place">
                    <p>
                      Start date:{" "}
                      {moment(eventwish.startdate).format("MMMM Do YYYY")}
                    </p>
                    {/* <p>-{moment(enddate).format("MMMM Do YYYY")}.</p> */}
                    <p className="event-location">
                      Location: <MdLocationPin style={{ color: "red" }} />{" "}
                      {eventwish.location}.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xl-6">
                  <div className="event-seats-and-participate">
                    <div className="going-interested">
                      <p>{eventwish.likes?.length} Likes </p>
                    </div>

                    <div className="going-interested">
                      <p>Max seats: {eventwish.maxmembers}</p>
                    </div>

                    <div className="going-interested">
                      <p>
                        Going <FcOk /> {eventwish.application?.length}
                      </p>
                    </div>
                    <div className="going-interested">
                      <p onClick={() => removeEventwishlist(eventwish._id)}>
                        Delete <MdDelete />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <button
                className="btn btn-danger"
                onClick={() => removeEventwishlist(eventwish._id)}
              >
                Delete
              </button> */}
            </div>
          </>
        ))}

        <div className="card pagination-dashboard">
          {getwishlist?.wishlist?.length > 1 ? (
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          ) : null}
        </div>
      </div>

      <ToastContainer autoClose={8000} />
    </React.Fragment>
  );
};

export default Wishlist;
