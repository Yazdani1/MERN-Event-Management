import React, { useEffect, useState } from "react";
import "./detailsevents.css";
import { getdetailsEvents } from "./APIDetails";
import { Link, useHistory, useParams } from "react-router-dom";

const Detailsevents = () => {
  const {id} = useParams();

  const [detailsevents, setDetailsevents] = useState([]);

  const loadDetailsevents = () => {
    getdetailsEvents(id)
      .then((detailsevent) => {
        setDetailsevents(detailsevent);
        console.log(detailsevent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailsevents();
  }, [detailsevents]);

  return (
    <div>
      <h5>{detailsevents && detailsevents.name}</h5>
    </div>
  );
};

export default Detailsevents;
