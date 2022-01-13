export const AddEvent = ({
  name,
  des,
  location,
  eventtypes,
  startdate,
  enddate,
  maxmembers,
}) => {
  return fetch("/api/create-event", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify({
      name,
      des,
      location,
      eventtypes,
      startdate,
      enddate,
      maxmembers,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
