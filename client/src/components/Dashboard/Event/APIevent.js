export const AddEvent = ({
  name,
  des,
  location,
  eventtypes,
  startdate,
  enddate,
  maxmembers,
  token
}) => {
  return fetch("/api/create-event", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      des,
      location,
      eventtypes,
      startdate,
      enddate,
      maxmembers,token
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
