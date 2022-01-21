import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { MdCardMembership } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { SyncOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { SiMicrodotblog } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { UserContext } from "../UserContext";
import { HiHand } from "react-icons/hi";
import { FaUserGraduate } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import { EyeOutlined } from "@ant-design/icons";
import { FcComboChart, FcFilledFilter } from "react-icons/fc";
import { removejoinedeventList } from "../HomePage/DetailsEvents/APIDetails";

const JoinedEvents = () => {
  //to add collapse option

  const [show, setShow] = useState(false);

  const [state, setState] = useContext(UserContext);
  const [userinfo, setUserinfo] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadlogedinuserInfo = () => {
    fetch("/api/logedinuser-allinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserinfo(result);
        setLoading(false);
        console.log("User all the details:" + result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeeventList = (e, postID) => {
    e.preventDefault();

    removejoinedeventList(postID)
      .then((result) => {
        if (result) {
          toast.success("Your event has been removed", {
            position: toast.POSITION.TOP_RIGHT,
          });
          loadlogedinuserInfo();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    loadlogedinuserInfo();

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
      <div className="container-fluid dashboard_items_container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <SiMicrodotblog size={35} />
                <p>Joined Events</p>
                <h4>{userinfo.joinedevents?.length}</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <MdCardMembership size={35} />
                <p>Wishlist Event</p>
                <p>{userinfo.wishlist.length}</p>
                {/* <p>
                  {moment(state && state.user && state.user.createdAt).format(
                    "MMMM Do YYYY"
                  )}
                </p> */}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <FaUserGraduate size={35} />
                <p>Member Type</p>

                {/* <p> {mypost.length >= 5 ? "Pro Account" : "Starter Account"}</p> */}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <AiFillMessage size={35} />

                <div className="profile-message">
                  {/* <h5>{user && user.message?.length}</h5> */}
                  <Link to="/message">
                    <button className="btn btn-primary">View Messagees</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

   

        <div className="container-fluid main_containers">
          {/* table start */}

          {userinfo.joinedevents?.length > 0 ? (
            <div className="card table-horizontal">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created</th>
                    <th scope="col">Location</th>
                    <th scope="col">Event Types</th>
                    <th scope="col">Total Members</th>
                    <th colspan="4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userinfo.joinedevents &&
                    [...userinfo.joinedevents].reverse().map((item, index) => (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>

                        <td>{item.name?.substring(0, 30)}</td>
                        <td>{ReactHtmlParser(item.des?.substring(0, 80))}</td>

                        <td> {moment(item.date).format("lll")}</td>
                        <td>{item.location}</td>
                        <td>{item.eventtypes}</td>
                        <td>{item.maxmembers}</td>
                        <td>{item.postedBy?.name}</td>

                        {/* to get all the joined members for each event post */}

                        {/* {item.application.map((joinedmembers) => (
                      <>
                        <p>{joinedmembers.name}</p>
                      </>
                    ))} */}

                        <td>
                          <Link to={"/event-tickets/" + item._id}>
                            <button className="btn btn-primary">
                              {item.application?.length}{" "}
                              Tickets
                            </button>
                          </Link>
                        </td>

                        {/* to loops the post comment in the admin dashboard */}
                        {/* <td>{item.comments.map(c=>(
                      <h1>{c.text}</h1>
                    ))}</td> */}

                        <td>
                          <Link to={"/event-details-page/" + item._id}>
                            <button className="btn btn-primary">
                              <EyeOutlined style={{ fontSize: "20px" }} /> View
                            </button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              removeeventList(e, item._id);
                            }}
                          >
                            <MdDelete size={20} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h5 className="card noposts-design">
              <FcComboChart size={200} />
              No data to show!
            </h5>
          )}

          <ToastContainer autoClose={8000} />

          {/* <div className="card pagination-dashboard">
          {myevents.length > 1 ? (
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          ) : null}
        </div> */}
        </div>

        {/* <div className="container p-5">
          <button onClick={() => setShow(true)} className="btn btn-primary">
            Show
          </button>
        </div>
        <button onClick={() => setShow(!show)} className="btn btn-danger">
          {show ? "Close" : "Add"}
        </button> */}

        {/* {show ? (
          <div className="card m-10">
            <input type="text" placeholder="Your name.." />
            <input type="text" placeholder="Your name.." />
            <button onClick={() => setShow(false)} className="btn btn-danger">
              Hide
            </button>
          </div>
        ) : (
          "result false"
        )} */}

        {/* <div className="card">
          <h5 onClick={() => setShow(true)}>
            This is a post title <SiMicrodotblog />
          </h5>
          {show ? (
            <div className="card">
              <p>This is a post description</p>
              <p>This is a post details information</p>
              <p onClick={() => setShow(false)}>
                {" "}
                <FaUserGraduate />
              </p>
            </div>
          ) : null}
        </div> */}
        <ToastContainer autoClose={8000} />
      </div>
    </React.Fragment>
  );
};

export default JoinedEvents;
