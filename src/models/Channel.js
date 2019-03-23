const mongoose = require("mongoose");
const shortid = require("shortid");

const ChannelSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String,
  playlist: [String]
});

const Channel = mongoose.model("channel", ChannelSchema);

module.exports = Channel;
