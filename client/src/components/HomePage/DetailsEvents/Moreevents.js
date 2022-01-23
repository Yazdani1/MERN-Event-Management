import React, { useEffect, useState } from "react";
import { getdetailsEvents } from "./APIDetails";
import "./moreevents.css";
import Alleventmobileview from "../Alleventmobileview";
import AlleventXLview from "../AlleventXLview";
import { Link, useHistory, useParams } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { addeventtoWishlist } from "../../Joinedevents/Event Wishlist/APIwishlist";


import {
  getallEvents,
  searchallEvents,
  addliketoEvent,
  unliketoEvent,
} from "../APIAllevents";

const Moreevents = () => {
  const { id } = useParams();

  const [moreeventsdetails, setMoreevents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDetailsevents = () => {
    getdetailsEvents(id)
      .then((resultevents) => {
        setMoreevents(resultevents);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //like events

  const addliketoEvents = (postId) => {
    addliketoEvent(postId)
      .then((result) => {
        const newItemData = moreeventsdetails.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setMoreevents(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // unlike events
  const unLikeevent = (postId) => {
    unliketoEvent(postId)
      .then((result) => {
        const newItemData = moreeventsdetails.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setMoreevents(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //save events to wishlist

  const saveEventWishlist = (postID) => {
    addeventtoWishlist(postID)
      .then((result) => {
        if (result) {
          toast.success("This event has saved to your profile", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailsevents();
  }, [moreeventsdetails]);

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
            joinedeventnumbers={event.application.length}
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
            joinedeventnumbers={event.application.length}
            totallikes={event.likes?.length}
            alreadylikedpost={event.likes}
            addlike={addliketoEvents}
            unlike={unLikeevent}
            saveWishlist={saveEventWishlist}

          />
        </>
      ))}
      <ToastContainer autoClose={8000} />
    </React.Fragment>
  );
};

export default Moreevents;
