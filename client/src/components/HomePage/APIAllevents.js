export const getallEvents = () => {
  return fetch("/api/get-allevents", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getallUsers = () => {
  return fetch("/api/getall-users", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getallEventorganizers = () => {
  return fetch("/api/getall-eventorganizers", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};



export const usersPublicprofile = (id) => {
  return fetch("/api/eventusers-public-profile/"+id, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};



