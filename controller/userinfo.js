const User = require("../model/User");

exports.getallUsers = (req, res) => {
  User.find({})
    .sort({ createdAt: "DESC" })
    .limit(12)
    .select("-password")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getallEventorganizers = (req, res) => {
  User.find({})
    .sort({ createdAt: "DESC" })
    .select("-password")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
