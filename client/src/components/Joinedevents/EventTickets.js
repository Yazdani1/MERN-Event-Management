import { geteventApplication } from "../Dashboard/Eventapplication/APIeventapplication";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../UserContext";
import Mobileviewdetailsevent from "../HomePage/DetailsEvents/Mobileviewdetailsevent";
import { Detailseventwebview } from "../HomePage/DetailsEvents/Detailseventwebview";
import "./eventtickets.css";
import { MdLocationPin } from "react-icons/md";
import jsPDF from "jspdf";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFDownloadLink,
//   PDFViewer,
// } from "@react-pdf/renderer";

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

  const showPdfdownloadlink = (
    eventname,
    name,
    email,
    location,
    startdate,
    enddate
  ) => {
    const doc = new jsPDF();

    doc.text(eventname, 10, 10);
    doc.text(name, 10, 20);
    doc.text(email, 10, 30);
    doc.text(location, 10, 40);
    doc.text(startdate, 10, 50);
    doc.text(enddate, 10, 60);

    doc.addPage();
    doc.text("Second Page", 10, 10);
    doc.save("event-tickets.pdf");
  };

  // const generatePdf = () => {
  //   const doc = new jsPDF("p", "pt", "a4");
  //   doc.html(document.querySelector("#ticket-design"), {
  //     callback: function (pdf) {
  //       pdf.save("event-ticket.pdf");
  //     },
  //   });
  // };

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

        <div
          className="all-tickets"
          style={{ maxHeight: "600px", overflow: "scroll" }}
        >
          {eventtickets.application.map((tickets) => (
            <>
              {tickets.postedBy?._id === state.user._id ? (
                <>
                  
                  <div className="ticket-design">
                    <h5>Event name: {eventtickets && eventtickets?.name}</h5>

                    <h5>
                      Event date:
                      {moment(eventtickets && eventtickets?.startdate).format(
                        "lll"
                      )}{" "}
                      -{" "}
                      {moment(eventtickets && eventtickets?.enddate).format(
                        "lll"
                      )}{" "}
                    </h5>

                    <div className="event-user-info">
                      <p>Name:{tickets.name}</p>
                      <p>
                        Location:
                        <MdLocationPin />{" "}
                        {eventtickets && eventtickets?.location}
                      </p>
                      <p>{tickets?.postedBy?.name}</p>
                      <p>E-mail: {tickets.email}</p>
                      <p>{}</p>
                    </div>
                  </div>

                  <span
                    className="view-allusers-button"
                    // onClick={generatePdf}
                    onClick={() =>
                      showPdfdownloadlink(
                        eventtickets && eventtickets?.name,
                        tickets.name,
                        tickets.email,
                        eventtickets && eventtickets?.location,
                        eventtickets && eventtickets?.startdate,
                        eventtickets && eventtickets?.enddate
                      )
                    }
                  >
                    Download Ticket
                  </span>
                </>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventTickets;
