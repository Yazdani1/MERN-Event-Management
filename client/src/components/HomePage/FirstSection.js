import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./Homefirstsection.css";
import { Link } from "react-router-dom";

const FirstSection = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <div className="container-fluid homepage-first">
        <div className="container first_section">
          <div className="row">
            <div className="col-md-12">
              <div class="top-left">
                <div className="first_Section_data">
                  <h5>Welcome to this event organization site</h5>
                  <p>You can organize your events from this site</p>
                  {!window.localStorage.getItem("tokenLogin") ? (
                    <>
                      <h5>
                        Become a member today and start sharing your Events
                      </h5>
                      <Link to={"/signup"}>
                        <button className="btn btn-primary">Create your account</button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/Dashboard">
                      <button className="btn btn-primary">
                        Create Your Events
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstSection;
