const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.ObjectId,
    immutable: true,
    ref: "Campaign",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    immutable: true,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  replies: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        immutable: true,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        immutable: true,
        ref: "User",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
