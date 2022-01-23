import React, { useState, useEffect, createContext } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = (props) => {
  const [userinfo, setUserinfo] = useState([]);

  const loadlogedinuserInfo = () => {
    fetch("/api/logedinuser-allinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserinfo(result);
        setLoading(false);
        console.log("User all the details:" + result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadlogedinuserInfo();
  }, []);

  return (
    <UserInfoContext.Provider value={[userinfo, setUserinfo]}>
      {props.children}
    </UserInfoContext.Provider>
  );
};
