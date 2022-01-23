import React, { useEffect, useState, useContext } from "react";
import "./detailsevents.css";
import { getdetailsEvents, joinevent, joinedeventList } from "./APIDetails";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { MdLocationPin } from "react-icons/md";
import Mobileviewdetailsevent from "./Mobileviewdetailsevent";
import { Detailseventwebview } from "./Detailseventwebview";
import Moreevents from "./Moreevents";
import Footer from "../../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../UserContext";
import { addeventtoWishlist } from "../../Joinedevents/Event Wishlist/APIwishlist";

import {
  getallEvents,
  searchallEvents,
  addliketoEvent,
  unliketoEvent,
} from "../APIAllevents";



const Detailsevents = () => {
  const { id } = useParams();
  const [state, setState] = useContext(UserContext);

  const history = useHistory();

  const [detailsevents, setDetailsevents] = useState([]);
  const [loading, setLoading] = useState(true);

  //to join the events

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const emailChange = (e) => {
    setError("");
    setEmail(e.target.value);
  };
  const participantsChange = (e) => {
    setError("");
    setParticipants(e.target.value);
  };

  const messageChange = (e) => {
    setError("");
    setMessage(e.target.value);
  };

  const savejoinedEvent = (e, postID) => {
    e.preventDefault();
    joinedeventList(postID)
      .then((result) => {
        if (result) {
          toast.success("event saved", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("event has saved");

          //get user state from local storage

          // let auth = JSON.parse(window.localStorage.getItem("tokenLogin"));
          // auth.user = result;
          // window.localStorage.setItem("tokenLogin", JSON.stringify(auth));

          // setState({ ...state, user: result });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinevents = (e, eventId) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    joinevent({ name, email, participants, message, eventId })
      .then((result) => {
        console.log(result);
        if (result.error) {
          setError(result.error);
        } else {
          setError("");
          setSuccess(true);
          toast.success("You have joined to this event", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setName("");
          setEmail("");
          setParticipants("");
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadDetailsevents = () => {
    getdetailsEvents(id)
      .then((detailsevent) => {
        setDetailsevents(detailsevent);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


    //like events

    const addliketoEvents = (postId) => {
      addliketoEvent(postId)
        .then((result) => {
          const newItemData = detailsevents?.singleevents?.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
  
          setDetailsevents(newItemData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    // unlike events
    const unLikeevent = (postId) => {
      unliketoEvent(postId)
        .then((result) => {
          const newItemData = detailsevents?.singleevents?.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
  
          setDetailsevents(newItemData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  //save events to wishlist

  const saveEventWishlist = (postID) => {
    addeventtoWishlist(postID)
      .then((result) => {
        if (result) {
          toast.success("This event has saved to your profile", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };





  useEffect(() => {
    loadDetailsevents();
  }, [detailsevents]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

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
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xl-8">
            <Detailseventwebview
              name={detailsevents && detailsevents?.singleevents?.name}
              des={detailsevents && detailsevents?.singleevents?.des}
              id={detailsevents && detailsevents?.singleevents?.postedBy?._id}
              photo={
                detailsevents && detailsevents?.singleevents?.postedBy?.photo
              }
              username={
                detailsevents && detailsevents?.singleevents?.postedBy?.name
              }
              date={detailsevents && detailsevents?.singleevents?.date}
              startdate={
                detailsevents && detailsevents?.singleevents?.startdate
              }
              enddate={detailsevents && detailsevents?.singleevents?.enddate}
              location={detailsevents && detailsevents?.singleevents?.location}
              joinedeventnumbers={
                detailsevents && detailsevents?.singleevents?.application.length
              }
              maxmembers={
                detailsevents && detailsevents?.singleevents?.maxmembers
              }
              postid={detailsevents && detailsevents?.singleevents?._id}


              totallikes={detailsevents && detailsevents?.singleevents?.likes?.length}
              alreadylikedpost={detailsevents && detailsevents?.singleevents?.likes}
              addlike={addliketoEvents}
              unlike={unLikeevent}
              saveWishlist={saveEventWishlist}
  


            />
          </div>

          {/* small screen details view */}

          <Mobileviewdetailsevent
            name={detailsevents && detailsevents?.singleevents?.name}
            des={detailsevents && detailsevents?.singleevents?.des}
            id={detailsevents && detailsevents?.singleevents?.postedBy?._id}
            photo={
              detailsevents && detailsevents?.singleevents?.postedBy?.photo
            }
            username={
              detailsevents && detailsevents?.singleevents?.postedBy?.name
            }
            date={detailsevents && detailsevents?.singleevents?.date}
            startdate={detailsevents && detailsevents?.singleevents?.startdate}
            enddate={detailsevents && detailsevents?.singleevents?.enddate}
            location={detailsevents && detailsevents?.singleevents?.location}
            maxmembers={
              detailsevents && detailsevents?.singleevents?.maxmembers
            }
            postid={detailsevents && detailsevents?.singleevents?._id}
          />

          <div className="col-lg-4 col-md-12 col-sm-12 col-xl-4">
            <div className="card event-form-designs">
              <div className="text-center">
                <h5 className="text-center">Join this Event</h5>
              </div>

              {showError()}

              <form>
                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={nameChange}
                    className="form-control"
                    maxLength="100"
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Your E-mail
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={emailChange}
                    className="form-control"
                    maxLength="100"
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Number of participants
                  </label>
                  <input
                    type="number"
                    value={participants}
                    onChange={participantsChange}
                    className="form-control"
                    maxLength="100"
                  />
                </div>
                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Message(optional)
                  </label>
                  <textarea
                    type="number"
                    value={message}
                    onChange={messageChange}
                    className="form-control"
                    rows={3}
                  />
                </div>
                <div className="main_container-button">
                  <button
                    className="btn btn-primary join-event-button"
                    disabled={!name || !email || !participants}
                    onClick={(e) => {
                      if (!localStorage.getItem("tokenLogin")) {
                        history.push("/signin");
                      } else {
                        joinevents(
                          e,
                          detailsevents && detailsevents?.singleevents?._id
                        );
                        savejoinedEvent(
                          e,
                          detailsevents && detailsevents?.singleevents?._id
                        );
                      }
                    }}
                  >
                    Join Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="moreevents-design">
          <h5>More Events</h5>
          <Moreevents />
        </div>
      </div>
      <ToastContainer autoClose={8000} />

      <Footer />
    </React.Fragment>
  );
};

export default Detailsevents;
