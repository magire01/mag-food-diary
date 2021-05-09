const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: { type: String, required: true },
    password: { type: String, required: true }
  });

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;