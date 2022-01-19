export const getdetailsEvents = (id) => {
  return fetch("/api/event-details/" + id, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//join event api

export const joinevent = (joinevent) => {
  return fetch("/api/join-event", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(joinevent),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
