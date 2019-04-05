const mongoose = require("mongoose");
const shortid = require("shortid");

const VoteSchema = new mongoose.Schema(
  {
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    vote: { type: Number, enum: [-1, 1] }
  },
  { _id: false }
);

const VideoSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true },
    votes: [VoteSchema]
  },
  { _id: false }
);

VideoSchema.virtual("score").get(function() {
  return this.votes.reduce((total, { vote }) => vote + total, 0);
});

const ChannelSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  playlist: [VideoSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const Channel = mongoose.model("channel", ChannelSchema);

module.exports = Channel;
