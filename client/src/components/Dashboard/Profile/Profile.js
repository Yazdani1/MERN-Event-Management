import React, { useEffect, useState, useContext } from "react";
import "./profile.css";
import { UserContext } from "../../UserContext";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  //context api
  const [state, setState] = useContext(UserContext);

  return (
    <React.Fragment>
      <div className="container card user-profile-info">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4">
            <h5>Your profile Information:</h5>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8">
          
          <h6>Name</h6>
            <div className="profile-items">
           
              <p>{state && state.user && state.user.name}</p>
              <p className="item-icons">
                <FaUserEdit size={20} />
              </p>
            </div>
            <h6>E-mail</h6>
            <div className="profile-items">
              <p>{state && state.user && state.user.email}</p>
              <p className="item-icons">
                <FaUserEdit size={20} />
              </p>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
