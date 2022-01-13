const Eventpost = require("../model/EventPost");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();

//to send email
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

exports.createEvent = (req, res) => {
  const {
    name,
    des,
    location,
    eventtypes,
    startdate,
    enddate,
    maxmembers,
  } = req.body;

  
  if (!name) {
    return res.status(400).json({ error: "please add event name.." });
  }

  if (!des) {
    return res.status(400).json({ error: "please add event description.." });
  }
  if (!location) {
    return res.status(400).json({ error: "please add event location.." });
  }

  if (!eventtypes) {
    return res.status(400).json({ error: "please add event types.." });
  }

  if (!startdate) {
    return res.status(400).json({ error: "please add event start date.." });
  }

  if (!enddate) {
    return res.status(400).json({ error: "please add event start date.." });
  }

  if (!maxmembers) {
    return res.status(400).json({ error: "please add event start date.." });
  }

  const postData = Post({
    name,
    des,
    location,
    eventtypes,
    startdate,
    enddate,
    date,
    maxmembers,
    postedBy: req.user,
  });

  Eventpost.create(postData)
    .then((ourPostData) => {
      transporter.sendMail({
        to: "yaz4good@gmail.com",
        from: "yaz4noor@gmail.com",
        subject: "Your Post has been published",
        html: `<h1 className="card">Congratulations! Your post is live now.
            <ul>
            <li>Post Title:${ourPostData.name} </li>
            <li>Post Description:${ourPostData.des} </li>
  
            </ul>
            </h1>`,
      });
      res.json(ourPostData);
    })
    .catch((err) => {
      console.log(err);
    });
};
