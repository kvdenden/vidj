const mongoose = require("mongoose");
const shortid = require("shortid");

const ChannelSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  playlist: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const Channel = mongoose.model("channel", ChannelSchema);

module.exports = Channel;
