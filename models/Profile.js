const mongoose = require("mongoose");
const { Schema } = mongoose;

//Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // Associate with the user id
    ref: "users" // Refer to the users collection
  },
  username: {
    type: String,
    required: true,
    max: 40 // Character length
  },
  bio: {
    type: String
  },
  realname: {
    type: String
  },
  alignment: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  origin: {
    // 1st appearance
    type: String
  },
  media: [
    // Media they've been featured in
    {
      title: {
        type: String,
        required: true
      },
      format: {
        // Whether a game, movie, etc.
        type: String,
        required: true
      },
      releaseyear: {
        type: Number,
        required: true
      },
      actor: {
        // Portrayed By
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
