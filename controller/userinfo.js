const User = require("../model/User");
const Eventpost = require("../model/EventPost");

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

//user public profile api

exports.userspublicProfile = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((userInfo) => {
      Eventpost.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name email photo")
        .populate("comments.postedBy", "_id name")
        .exec((err, postsData) => {
          if (err) {
            return res.status(400).json({ error: err });
          }
          res.json({ userInfo, postsData });
        })
        .catch((err) => {
          return res.status(404).json({ error: err });
        });
    });
};

//user public profile api end

//search event organizers

exports.serachEventorganizers = (req, res) => {
  // var searchquery  = req.body.query;

  // if(!searchquery){
  //   return res.status(400).json({ error: "add search items" });
  // }

  let searchPattern = new RegExp("^" + req.body.query);

  User.find({ email: { $regex: searchPattern } })
    .select("name email photo createdAt")
    .then((usersearchrecord) => {
      if (usersearchrecord) {
        res.json({ usersearchrecord });
      }else{
        return res.status(400).json({ resultnotfound: "No search result founds" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ resultnotfound: "No search result founds" });
    });
};
