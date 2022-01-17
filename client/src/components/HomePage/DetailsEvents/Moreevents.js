import React, { useEffect, useState } from "react";
import { getdetailsEvents } from "./APIDetails";
import "./moreevents.css";
import Alleventmobileview from "../Alleventmobileview";
import AlleventXLview from "../AlleventXLview";
import { Link, useHistory, useParams } from "react-router-dom";

const Moreevents = () => {
    const { id } = useParams();

  const [moreeventsdetails, setMoreevents] = useState([]);

  const loadDetailsevents = () => {
    getdetailsEvents(id)
      .then((resultevents) => {
        setMoreevents(resultevents);
        console.log(resultevents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailsevents();
  }, [moreeventsdetails]);

  return (
    <React.Fragment>
      {moreeventsdetails?.moreevents?.map((event) => (
        <>
          <Alleventmobileview
            name={event.name}
            des={event.des}
            id={event.postedBy?._id}
            photo={event?.postedBy?.photo}
            username={event.postedBy?.name}
            postid={event._id}
            date={event.date}
            startdate={event.startdate}
            enddate={event.enddate}
            location={event.location}
            maxmembers={event.maxmembers}
          />

          <AlleventXLview
            name={event.name}
            des={event.des}
            id={event.postedBy?._id}
            photo={event?.postedBy?.photo}
            username={event.postedBy?.name}
            postid={event._id}
            date={event.date}
            startdate={event.startdate}
            enddate={event.enddate}
            location={event.location}
            maxmembers={event.maxmembers}
          />
        </>
      ))}
    </React.Fragment>
  );
};

export default Moreevents;
