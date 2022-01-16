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
  return fetch("/api/eventusers-public-profile/" + id, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//search event

export const searchallEvents = (query) => {
  return fetch("/api/search-events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//search event organizers profiles.

export const eventorganizerProfile = (query) => {
  return fetch("/api/search-eventorganizers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
