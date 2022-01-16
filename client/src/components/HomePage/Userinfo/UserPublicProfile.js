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
        console.log(result)
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
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Write your message
                        </h5>
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
                          <div class="form-group">
                            <label for="exampleFormControlTextarea2"></label>
                            <textarea
                              class="form-control rounded-0"
                              placeholder="Type your message.."
                              // value={about}
                              rows="8"
                              // value={text}
                              // onChange={(e) => setText(e.target.value)}
                              // maxLength="150"
                            />
                            {/* <p>{text ? text.length : 0} </p> */}
                          </div>
                          {/* <button
                            type="submit"
                            class="btn btn-success custBtn"
                            onClick={(e) =>
                              sendmessage(e, mypost?.userInfo?._id)
                            }
                          >
                            SEND
                          </button> */}
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
      
      </div>
      <ToastContainer autoClose={8000} />
    </>
  );
};
export default UserPublicProfile;
