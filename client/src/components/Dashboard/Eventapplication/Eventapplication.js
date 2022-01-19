import "./Eventapplication.css";
import { geteventApplication } from "./APIeventapplication";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { FcOk } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { MdLocationPin } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import Mobileviewdetailsevent from "../../HomePage/DetailsEvents/Mobileviewdetailsevent";
import { Detailseventwebview } from "../../HomePage/DetailsEvents/Detailseventwebview";

const Eventapplication = () => {
  const { id } = useParams();

  const [eventapplication, setEventapplication] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadeventApplication = () => {
    geteventApplication(id)
      .then((result) => {
        setEventapplication(result);
        console.log("Event application is:" + result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadeventApplication();
  }, [eventapplication]);

  return (
    <React.Fragment>
      <div className="container">
        <Detailseventwebview
          name={eventapplication && eventapplication?.name}
          des={eventapplication && eventapplication?.des}
          id={eventapplication && eventapplication?.postedBy?._id}
          photo={eventapplication && eventapplication?.postedBy?.photo}
          username={eventapplication && eventapplication?.postedBy?.name}
          date={eventapplication && eventapplication?.date}
          startdate={eventapplication && eventapplication?.startdate}
          enddate={eventapplication && eventapplication?.enddate}
          location={eventapplication && eventapplication?.location}
          maxmembers={eventapplication && eventapplication?.maxmembers}
        />



        <Mobileviewdetailsevent
          name={eventapplication && eventapplication?.name}
          des={eventapplication && eventapplication?.des}
          id={eventapplication && eventapplication?.postedBy?._id}
          photo={eventapplication && eventapplication?.postedBy?.photo}
          username={eventapplication && eventapplication?.postedBy?.name}
          date={eventapplication && eventapplication?.date}
          startdate={eventapplication && eventapplication?.startdate}
          enddate={eventapplication && eventapplication?.enddate}
          location={eventapplication && eventapplication?.location}
          maxmembers={eventapplication && eventapplication?.maxmembers}
        />
      </div>
    </React.Fragment>
  );
};

export default Eventapplication;
