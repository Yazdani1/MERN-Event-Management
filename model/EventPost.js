const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var postSchema = mongoose.Schema({
  name: {
    type: String,
  },
  des: {
    type: String,
  },
  location: {
    type: String,
  },

  eventtypes: {
    type: String,
  },

  startdate: {
    type: String,
  },

  enddate: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  maxmembers: {
    type: Number,
  },

  likes: [
    {
      type: ObjectId,
      ref: "User",
      // postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("EventPost", postSchema);
