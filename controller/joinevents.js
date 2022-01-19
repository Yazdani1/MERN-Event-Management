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

exports.joinEvent = (req, res) => {
  const { name, email, participants, message } = req.body;
  const joinapplication = {
    name,
    email,
    participants,
    message,
    postedBy: req.user._id,
  };

  if (!name) {
    return res.status(400).json({ error: "Your name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Your e-mail is required" });
  }
  if (!participants) {
    return res.status(400).json({ error: "number of participant is required" });
  }

  Eventpost.findByIdAndUpdate(
    req.body.eventId,
    {
      $push: { application: joinapplication },
    },
    {
      new: true,
    }
  )
    .populate("application.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};
