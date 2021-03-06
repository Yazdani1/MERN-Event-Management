import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Navwebview from "./Navbar/Navwebview";
import Navheader from "./Navbar/Navheader";

import "./Navbar/navheader.css";
import "./Navbar/navweb.css";
import "./Navbar/navmobile.css";

const DashboardprotectedRoute = (props) => {
  const history = useHistory();
  let DashboardProtected = props.DashboardProtect;

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
      <Navheader data={openNavbar} />

      {/* <div className="container fluid"> */}
      <div className="row">
        <div className="col-xl-2">
          <Navwebview sidebar={sidebar} />
          {/* <DashboardNav /> */}
        </div>
        <div className="col-xl-10">
          <DashboardProtected />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DashboardprotectedRoute;
