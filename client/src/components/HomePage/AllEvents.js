import React, { useEffect, useState, useContext } from "react";

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
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            {allevents.map((event, index) => (
              <div className="card">
                <h5>{event.name}</h5>
                <p>Posted By: {event.postedBy.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllEvents;
