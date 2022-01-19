import React, { useState, useEffect, useContext } from "react";

import moment from "moment";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";
import { SiMicrodotblog } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "./Userpublicprofile.css";
import "../Allevents.css";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";
import { usersPublicprofile } from "../../HomePage/APIAllevents";
import { FcButtingIn } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
import AlleventXLview from "../AlleventXLview";
import Alleventmobileview from "../Alleventmobileview";

const UserPublicProfile = () => {
  const [myevents, setMyevents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  //to send message

  const getMypost = () => {
    usersPublicprofile(id)
      .then((result) => {
        setMyevents(result);
        console.log(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMypost();
  }, []);

  if (loading) {
    return (
      <div class="text-center my-5">
        <h1>
          <SyncOutlined spin />
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="container profile-header-margin">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="profile-headers">
                {myevents?.userInfo?.photo ? (
                  <div className="user-profile-image-incircles img">
                    <img src={myevents?.userInfo?.photo} />
                  </div>
                ) : (
                  <div className="profile-pic-user-profiles">
                    <h2 className="user-profile-name-incircles">
                      {myevents?.userInfo?.name.substring(0, 2).toUpperCase()}
                    </h2>
                  </div>
                )}

                <div className="profile-pic-user-profile-names">
                  <h2>{myevents?.userInfo?.name}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container profile_items_container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="public-profile-items card">
              <div className="profile-items_design">
                <MdCardMembership size={35} />
                <p>Member Since</p>
              </div>
              <p className="member-accountcreated-date">
                {moment(myevents?.userInfo?.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <SiMicrodotblog size={35} />
                <p>Published Posts</p>
                <h4>{myevents?.postsData?.length}</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <FaUserGraduate size={35} />
                <p>Member Type</p>
                <p>
                  {myevents?.postsData?.length >= 5 ? (
                    <p>Pro Account</p>
                  ) : (
                    "Starter Account"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <p>
                  <AiFillMessage size={35} />
                </p>
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Send Message <RiSendPlaneFill size={25} />
                </button>
                <div
                  className="modal fade"
                  id="exampleModalCenter"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <p className="modal-title" id="exampleModalLongTitle">
                          Write your message
                        </p>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="event-form">
                            <label
                              for="exampleInputEmail1"
                              className="form-label"
                            >
                             Name
                            </label>
                            <input
                              type="text"
                              // value={name}
                              // onChange={(e) => setName(e.target.value)}
                              className="form-control"
                              maxLength="100"
                              placeholder="Your name.."
                            />
                          </div>

                          <div className="event-form">
                            <label
                              for="exampleInputEmail1"
                              className="form-label"
                            >
                               E-mail
                            </label>
                            <input
                              type="text"
                              // value={name}
                              // onChange={(e) => setName(e.target.value)}
                              className="form-control"
                              maxLength="100"
                              placeholder="Your E-mail.."

                            />
                          </div>

                          <div className="event-form">
                            <label
                              for="exampleInputEmail1"
                              className="form-label"
                            >
                              Message
                            </label>
                            <textarea
                              type="number"
                              // value={maxmembers}
                              // onChange={(e) => setMaxmembers(e.target.value)}
                              className="form-control"
                              rows={3}
                              maxLength="100"
                              placeholder="Your message.."

                            />
                          </div>
                          <div className="main_container-button">
                            <span className="view-allusers-button">
                              Send Message
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* user about section */}

      {/* {mypost?.userInfo?.about ? (
        <div className="container profile-about-container">
          <div className="card">
            <div className="user-about-page">
              <h5>About Me</h5>

              <p>{ReactHtmlParser(mypost?.userInfo?.about)}</p>
            </div>
          </div>
        </div>
      ) : null} */}

      {/* user experience section */}

      {/* {mypost?.userInfo?.experience ? (
        <div className="container  profile-about-container">
          <div className="card">
            <div className="user-about-page">
              <h5>Experience</h5>
              <p>{ReactHtmlParser(mypost?.userInfo?.experience)}</p>
            </div>
          </div>
        </div>
      ) : null} */}

      <div className="container all-events-container">
        <div className="row">
          {myevents?.postsData?.map((event, index) => (
            <>
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
              />

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
              />
            </>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </>
  );
};
export default UserPublicProfile;
