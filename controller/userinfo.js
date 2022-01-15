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

exports.userspublicProfile = (req,res)=>{

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

}
