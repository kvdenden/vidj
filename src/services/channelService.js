const Channel = require("../models/Channel");
const moveArray = require("../utils").moveArray;

module.exports = {
  index: async () => {
    return await Channel.find();
  },

  get: async channelId => {
    return await Channel.findById(channelId);
  },

  create: async props => {
    return await new Channel(props).save();
  },

  addSong: async (channelId, videoId) => {
    return await Channel.findByIdAndUpdate(
      channelId,
      {
        $push: { playlist: videoId }
      },
      { new: true }
    );
  },

  nextSong: async channelId => {
    return await Channel.findByIdAndUpdate(
      channelId,
      {
        $pop: { playlist: -1 }
      },
      { new: true }
    );
  },

  moveSong: async (channelId, from, to) => {
    const channel = await Channel.findById(channelId);
    if (channel) {
      channel.playlist = moveArray(channel.playlist, from, to);
      channel.save();
    }
    return channel;
  }
};
