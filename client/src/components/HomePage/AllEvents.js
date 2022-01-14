import React, { useEffect, useState, useContext } from "react";
import "./Allevents.css";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

const AllEvents = () => {
  const [allevents, setAllevents] = useState([]);

  const loadallEvents = () => {
    fetch("/api/get-allevents", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setAllevents(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallEvents();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          {allevents.map((event, index) => (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="card all-events">
                {/* <h5>{event.name}</h5>
                <p>Posted By: {event.postedBy.name}</p> */}

                <div className="profile-name-date">
                  {event?.postedBy?.photo ? (
                    <div className="profile-name-avatar-image">
                      <img src={event.postedBy.photo} />
                    </div>
                  ) : (
                    <div className="profile-name-avatar">
                      <p>{event.postedBy.name.substring(0, 2).toUpperCase()}</p>
                    </div>
                  )}

                  <div className="profile-name-post-date">
                    <p className="profile-name-size">{event.postedBy.name}</p>
                    <p>{moment(event.date).format("MMMM Do YYYY")}</p>
                  </div>
                </div>
                <h5>{event.name}</h5>
                <p>{ReactHtmlParser(event.des?.substring(0, 350))}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllEvents;
