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
    .populate(
      "joinedevents",
      "name des location eventtypes startdate enddate date maxmembers application "
    )
    .then((userInfo) => {
      Eventpost.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name email photo")
        .populate("application.postedBy", "_id name")
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

  // let searchPattern = new RegExp("^" + req.body.query);
  let searchPattern = req.body.query;

  User.find({ name: { $regex: searchPattern, $options: "i" } })
    .select("name email photo createdAt")
    .then((usersearchrecord) => {
      res.json({ usersearchrecord });
    })
    .catch((err) => {
      console.log(err);
    });
};

//loged in user info

exports.logedinuserInfo = (req, res) => {
  User.findOne({ _id: req.user._id })
    .populate(
      "joinedevents",
      "name des location eventtypes startdate enddate date maxmembers application"
    )

    .populate("message.postedBy", "name email _id photo")

    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
};

//send message to user

exports.sendMessage = (req, res) => {
  const { name, email, textmessage } = req.body;

  const sendmessage = {
    name,
    email,
    textmessage,
    postedBy: req.user._id,
  };

  if (!name) {
    return res.status(400).json({ error: "Name is required.." });
  }
  if (!email) {
    return res.status(400).json({ error: "E-mail is required.." });
  }
  if (!textmessage) {
    return res.status(400).json({ error: "Write your  message.." });
  }

  User.findByIdAndUpdate(
    req.body.userID,
    {
      $push: { message: sendmessage },
    },
    {
      new: true,
    }
  )
    .populate("message.postedBy", "_id name email photo")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
};

//add to wishlist event api

exports.addtoWishlist = (req, res) => {
  const { postID } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    $addToSet: { wishlist: postID },
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

//remove event from wishlist api end point

exports.removeeventWishlist = (req, res) => {
  const { postID } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: postID },
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
