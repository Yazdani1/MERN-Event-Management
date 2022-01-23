import React from "react";
import "./totalpostcount.css";
import { BsGraphUp } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";

import { Link, useHistory, useParams } from "react-router-dom";

const Totalpostcount = ({ totalpost, totaluser }) => {
  return (
    <div className="container total-post-info">
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="card home-post-count">
            <div className="profile-items_design">
              <p>Total Published Events</p>
              <h4>
                <BsGraphUp size={25} />
              </h4>
              <p>{totalpost}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="card home-post-count">
            <div className="profile-items_design">
              <p>Joined Members</p>

              <p>
                <FaUserSecret size={25} />
              </p>

              <p>{totaluser}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="card home-post-count">
            <div className="profile-items_design">
              <p>Become a Mamber Today</p>
              <p>
                <MdCardMembership size={25} />
              </p>
              <Link to="/dashboard">
                <button className="btn btn-primary">Publish Your Post</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Totalpostcount;
