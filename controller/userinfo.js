const User = require("../model/User");

exports.getallUsers = (req, res) => {
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
