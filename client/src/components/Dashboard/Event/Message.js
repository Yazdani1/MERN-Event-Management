import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../UserInfoContext";
import moment from "moment";
import { SyncOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";

const Message = () => {
  const [userinfo, setUserinfo] = useContext(UserInfoContext);

  return (
    <React.Fragment>
      <div className="container">
        <p className="total-application">
          Total Messages: {userinfo.message?.length}
        </p>

        <div
          className="event-application"
          //   style={{ maxHeight: "550px", overflow: "scroll" }}
        >
          <div className="row">
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xl-12"
              style={{ maxHeight: "850px", overflow: "scroll" }}
            >
              {userinfo.message?.map((message) => (
                <div className="event-application-views">
                  <div className="card all-events">
                    <Link
                      to={"/organizers-public-profile/" + message.postedBy?._id}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="profile-name-date">
                        {message && message.postedBy?.photo ? (
                          <div className="profile-name-avatar-image">
                            <img src={message && message.postedBy?.photo} />
                          </div>
                        ) : (
                          <div className="profile-name-avatar">
                            <p>
                              {message &&
                                message.postedBy?.name
                                  ?.substring(0, 2)
                                  .toUpperCase()}
                            </p>
                          </div>
                        )}

                        <div className="profile-name-post-date">
                          <p className="profile-name-size">
                            {message && message.postedBy?.name}
                          </p>
                          <p>
                            {moment(message && message.date).format(
                              "MMMM Do YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <h5>{message && message.name}</h5>
                    <p>{message && message.email}</p>
                    <p>{message && message.textmessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="card pagination-dashboard">
            {eventapplication.application?.length > 1 ? (
              <Pagination
                pages={howManyPages}
                setCurrentPage={setCurrentPage}
              />
            ) : null}
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;
