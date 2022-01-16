import React from "react";
import FirstSection from "./FirstSection";
import AllEvents from "./AllEvents";
import UserList from "./UserList";
import Totalpostcount from "./TotalPostCount";

const Home = () => {
  return (
    <div>
      <FirstSection />
      <Totalpostcount/>
      <AllEvents />
      <UserList />
    </div>
  );
};

export default Home;
