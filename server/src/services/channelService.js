const Channel = require("../models/Channel");
const { moveArray, removeAt } = require("../utils");

module.exports = {
  find: async filter => {
    return await Channel.find(filter);
  },

  get: async channelId => {
    return await Channel.findById(channelId);
  },

  create: async props => {
    return await new Channel(props).save();
  },

  addVideo: async (channelId, videoId) => {
    return await Channel.findByIdAndUpdate(
      channelId,
      {
        $push: { playlist: { videoId } }
      },
      { new: true }
    );
  },

  nextVideo: async channelId => {
    return await Channel.findByIdAndUpdate(
      channelId,
      {
        $pop: { playlist: -1 }
      },
      { new: true }
    );
  },

  moveVideo: async (channelId, from, to) => {
    const channel = await Channel.findById(channelId);
    if (channel) {
      channel.playlist = moveArray(channel.playlist, from, to);
      channel.save();
    }
    return channel;
  },

  removeVideo: async (channelId, index) => {
    const channel = await Channel.findById(channelId);
    if (channel) {
      channel.playlist = removeAt(channel.playlist, index);
      channel.save();
    }
    return channel;
  },

  vote: async (channelId, index, voter, vote) => {
    // Remove previous vote by user if it exists
    await Channel.findByIdAndUpdate(channelId, {
      $pull: { [`playlist.${index}.votes`]: { voter: voter._id } }
    });

    const channel = await Channel.findByIdAndUpdate(
      channelId,
      {
        $push: { [`playlist.${index}.votes`]: { voter, vote } }
      },
      { new: true }
    );

    return channel;
  }
};
