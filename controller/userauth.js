const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth");
const crypto = require("crypto");
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

exports.userRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ errort: "Please Add Your Full Name" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ errort: "Please Add Your valid E-mail Address" });
    }
    if (!password) {
      return res.status(400).json({ errort: "Please Add Your Password" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errort: "User already exist" });
    }
    const hash_password = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hash_password,
    });
    await user.save().then((registerData) => {
      transporter.sendMail({
        to: registerData.email,
        from: "yaz4noor@gmail.com",
        subject: "Signup Success",
        html: `<h1>Welcome to Event Management site. You have become a member
          
          <h5>Your Details</h5>
          <ul>
          <li><p>Your Name: ${registerData.name}</p></li>
          <li><p>Your E-mail: ${registerData.email}</p></li>
          <li><p>You have joined: ${registerData.createdAt}</p></li>
  
          </ul>
          </h1>`,
      });
      res.json(registerData);
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "add your register email" });
    }

    if (!password) {
      return res.status(400).json({ error: "add your password" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Account could not found " });
    }

    const isMatchData = await bcrypt.compare(password, user.password);
    if (!isMatchData) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // const { _id, name, email } = user;

    // return res.json({ token, user });
    transporter.sendMail({
      to: user.email,
      from: "yaz4noor@gmail.com",
      subject: "Sign in Success",
      html: `<h1> You have successfully loged in to your account. Your name is: ${user.name}
        You Joined on ${user.createdAt}
        <ul>
        </ul>
        </h1>`,
    });

    user.password = undefined;
    user.expireToken = undefined;
    user.resetToken = undefined;

    return res.json({ token, user});
  } catch (err) {
    console.log(err);
  }
};

exports.passwordReset = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");

    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ error: "Please add your valid E-mail!" });
    }

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "No user with this email address" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "yaz4noor@gmail.com",
          subject: "Reset Password",
          html: `
            <p>You have requested to reset your password</p>
            <h4>Click in this <a href="${process.env.resetpass_url}/reset/${token}" > link  </a> to reset your password</h4>
            `,
        });
        res.json({ message: "Check your email for password reset" });
      });
    });
  });
};

exports.newPassword = (req, res) => {
  const newpassword = req.body.password;

  if (!newpassword) {
    return res.status(422).json({ error: "Add your new password" });
  }

  const sentToken = req.body.token;

  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Try again later. Your session has expired" });
      }

      bcrypt.hash(newpassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;

        user.save().then((savedpassword) => {
          transporter.sendMail({
            to: user.email,
            from: "yaz4noor@gmail.com",
            subject: "You have changed your Password",
            html: `
              <h5>You have successfully changed your password!</h5>
              `,
          });

          res.json({ message: "You have changed your password" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
