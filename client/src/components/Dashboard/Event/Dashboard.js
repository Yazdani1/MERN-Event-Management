import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
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
import Pagination from "./Pagination";
import { FcComboChart, FcFilledFilter } from "react-icons/fc";
import "./dashboard.css";
import "./pagination.css";
import { EyeOutlined } from "@ant-design/icons";
import ReactHtmlParser from "react-html-parser";
import { getmyEvents, deletemyEvents } from "./Apievents";
import { HiHand } from "react-icons/hi";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [myevents, setMyevents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myevents.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(myevents.length / postsPerPage);

  const loadallEvents = () => {
    getmyEvents()
      .then((result) => {
        setMyevents(result);
        console.log(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteevents = (id) => {
    deletemyEvents(id)
      .then((result) => {
        if (result) {
          loadallEvents();
          toast.success("Event Deleted Successfully! ", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="container-fluid dashboard_items_container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <SiMicrodotblog size={35} />
                <p>Published Events</p>
                <h4>{myevents.length}</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
            <div className="card dashboard-items-info">
              <div className="dashboard-items_design">
                <MdCardMembership size={35} />
                <p>Member Since</p>
                <p>
                  {moment(state && state.user && state.user.createdAt).format(
                    "MMMM Do YYYY"
                  )}
                </p>
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
      </div>

      <div className="container-fluid main_containers">
        {/* table start */}

        {currentPosts.length > 0 ? (
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
                {currentPosts.map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>

                    <td>{item.name.substring(0, 30)}</td>
                    <td>{ReactHtmlParser(item.des?.substring(0, 80))}</td>

                    <td> {moment(item.date).format("lll")}</td>
                    <td>{item.location}</td>
                    <td>{item.eventtypes}</td>
                    <td>{item.maxmembers}</td>

                    {/* to get all the joined members for each event post */}

                    {/* {item.application.map((joinedmembers) => (
                      <>
                        <p>{joinedmembers.name}</p>
                      </>
                    ))} */}

                    <td>
                      <Link to={"/event-application/" + item._id}>
                        <button className="btn btn-primary">
                         {item.application.length} <HiHand style={{ fontSize: "20px" }} /> Joined
                        </button>
                      </Link>
                    </td>

                    {/* to loops the post comment in the admin dashboard */}
                    {/* <td>{item.comments.map(c=>(
                      <h1>{c.text}</h1>
                    ))}</td> */}

                    <td>
                      <Link to={"/details/" + item._id}>
                        <button className="btn btn-primary">
                          <EyeOutlined style={{ fontSize: "20px" }} /> View
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={"/editpost/" + item._id}>
                        <button className="btn btn-success">
                          <AiTwotoneEdit size={20} />
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteevents(item._id);
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

        <div className="card pagination-dashboard">
          {myevents.length > 1 ? (
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          ) : null}
        </div>
      </div>

      <ToastContainer autoClose={8000} />
    </React.Fragment>
  );
};

export default Dashboard;
