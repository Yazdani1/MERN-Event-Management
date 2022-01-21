import { geteventApplication } from "../Dashboard/Eventapplication/APIeventapplication";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../UserContext";
import Mobileviewdetailsevent from "../HomePage/DetailsEvents/Mobileviewdetailsevent";
import { Detailseventwebview } from "../HomePage/DetailsEvents/Detailseventwebview";
import "./eventtickets.css";

const EventTickets = () => {
  const { id } = useParams();
  const [state, setState] = useContext(UserContext);

  const [eventtickets, setEventtickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadjoinedEvents = () => {
    geteventApplication(id)
      .then((result) => {
        if (result) {
          setEventtickets(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadjoinedEvents();
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
      <div className="container">
        <Detailseventwebview
          name={eventtickets && eventtickets?.name}
          des={eventtickets && eventtickets?.des}
          id={eventtickets && eventtickets?.postedBy?._id}
          photo={eventtickets && eventtickets?.postedBy?.photo}
          username={eventtickets && eventtickets?.postedBy?.name}
          date={eventtickets && eventtickets?.date}
          startdate={eventtickets && eventtickets?.startdate}
          enddate={eventtickets && eventtickets?.enddate}
          location={eventtickets && eventtickets?.location}
          maxmembers={eventtickets && eventtickets?.maxmembers}
          postid={eventtickets && eventtickets?._id}
        />

        <Mobileviewdetailsevent
          name={eventtickets && eventtickets?.name}
          des={eventtickets && eventtickets?.des}
          id={eventtickets && eventtickets?.postedBy?._id}
          photo={eventtickets && eventtickets?.postedBy?.photo}
          username={eventtickets && eventtickets?.postedBy?.name}
          date={eventtickets && eventtickets?.date}
          startdate={eventtickets && eventtickets?.startdate}
          enddate={eventtickets && eventtickets?.enddate}
          location={eventtickets && eventtickets?.location}
          maxmembers={eventtickets && eventtickets?.maxmembers}
          postid={eventtickets && eventtickets?._id}
        />

        <h6>Download your event tickets:</h6>

        {eventtickets.application.map((tickets) => (
          <>
            {tickets.postedBy?._id === state.user._id ? (
              <div className="ticket-design">
                <h5>Event name: {eventtickets && eventtickets?.name}</h5>

                <h5>
                  Event date:
                  {moment(eventtickets && eventtickets?.startdate).format(
                    "lll"
                  )}{" "}
                  -{" "}
                  {moment(eventtickets && eventtickets?.enddate).format("lll")}{" "}
                </h5>

                <div className="event-user-info">
                  <p>Name:{tickets.name}</p>
                  <p>Location: {eventtickets && eventtickets?.location}</p>
                  <p>E-mail: {tickets.email}</p>
                  <p>{}</p>
                </div>
              </div>
            ) : null}
          </>
        ))}
      </div>
    </React.Fragment>
  );
};

export default EventTickets;
