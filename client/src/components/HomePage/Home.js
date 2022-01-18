import React, { useEffect, useState } from "react";
import FirstSection from "./FirstSection";
import AllEvents from "./AllEvents";
import UserList from "./UserList";
import Totalpostcount from "./TotalPostCount";
import { getallEvents, getallEventorganizers } from "./APIAllevents";
import Footer from "../Footer/Footer";

const Home = () => {
  const [allevent, setAllevents] = useState([]);
  const [allusers, setAllusers] = useState([]);

  const loadallEvents = () => {
    getallEvents()
      .then((result) => {
        setAllevents(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadallUsers = () => {
    getallEventorganizers()
      .then((result) => {
        setAllusers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadallEvents();
    loadallUsers();
  }, []);

  return (
    <div>
      <FirstSection />
      <Totalpostcount totalpost={allevent.length} totaluser={allusers.length} />
      <AllEvents />
      <UserList />
      <Footer />
    </div>
  );
};

export default Home;
