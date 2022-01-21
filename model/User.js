const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    about: {
      type: String,
    },

    wishlist: [
      {
        type: ObjectId,
        ref: "EventPost",
      },
    ],

    joinedevents: [
      {
        type: ObjectId,
        ref: "EventPost",
      },
    ],

    photo: {
      type: String,
    },

    message: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
