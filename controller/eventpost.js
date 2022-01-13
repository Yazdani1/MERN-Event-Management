const Eventpost = require("../model/EventPost");
const { requireLogin } = require("../middleware/auth");

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
  if (!location) {
    return res.status(400).json({ error: "please add event location.." });
  }

  if (!maxmembers) {
    return res.status(400).json({ error: "please add event participants number.." });
  }

  if (!eventtypes) {
    return res.status(400).json({ error: "please add event types.." });
  }

  if (!des) {
    return res.status(400).json({ error: "please add event description.." });
  }
 


  if (!startdate) {
    return res.status(400).json({ error: "please add event start date.." });
  }

  if (!enddate) {
    return res.status(400).json({ error: "please add event end date.." });
  }

 

  const postData = Eventpost({
    name,
    des,
    location,
    eventtypes,
    startdate,
    enddate,
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
