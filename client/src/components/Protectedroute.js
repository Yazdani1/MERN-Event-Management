import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbarwebviewfront from "./Navbarfrontside/Navbarwebviewfront";

function ProtectedRoute(props) {


  let Cmprops = props.FrontProtected;


  return (
    <div>
    
      <Navbarwebviewfront />
      <Cmprops />
    </div>
  );
}
export default ProtectedRoute;
