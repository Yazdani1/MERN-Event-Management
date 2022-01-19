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
import { FaUserGraduate } from "react-icons/fa";

const JoinedEvents = () => {
  //to add collapse option

  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <div className="container-fluid dashboard_items_container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <SiMicrodotblog size={35} />
                <p>Joined Events</p>
                {/* <h4>{myevents.length}</h4> */}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <MdCardMembership size={35} />
                <p>Member Since</p>
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
      </div>
    </React.Fragment>
  );
};

export default JoinedEvents;
