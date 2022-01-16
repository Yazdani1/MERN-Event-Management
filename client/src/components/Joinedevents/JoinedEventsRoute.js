import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import MyeventsNavheader from "./Navbar/MyeventsNavheader";
import MyeventsNavweb from "./Navbar/MyeventsNavweb";

const JoinedEventsRoute = (props) => {
  const history = useHistory();
  let Joinedeventprotected = props.JoinedevenRouteprotect;

  useEffect(() => {
    if (!localStorage.getItem("tokenLogin")) {
      history.push("/signin");
    } else {
    }
  }, []);

  const [sidebar, setSidebar] = useState(true);

  const openNavbar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="container-fluid">
      <MyeventsNavheader data={openNavbar} />

      <div className="row">
        <div className="col-xl-2">
          <MyeventsNavweb sidebar={sidebar} />
        </div>
        <div className="col-xl-10">
          <Joinedeventprotected />
        </div>
      </div>
    </div>
  );
};

export default JoinedEventsRoute;
