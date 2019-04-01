const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const UserSchema = new mongoose.Schema({
  token: {
    type: String,
    index: true,
    default: uuidv4
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
