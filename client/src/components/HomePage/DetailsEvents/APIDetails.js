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
