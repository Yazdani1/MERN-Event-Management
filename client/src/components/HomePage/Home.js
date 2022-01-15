import React from "react";
import FirstSection from "./FirstSection";
import AllEvents from "./AllEvents";
import UserList from "./UserList";

const Home = () => {
  return (
    <div>
      <FirstSection />
      <AllEvents />
      <UserList />
    </div>
  );
};

export default Home;
