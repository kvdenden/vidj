const channelService = require("../services/channelService");

const channelData = (channel, user) => {
  console.log(`channelData`, channel, user);
  const { id, playlist } = channel;
  const isOwner = user && user.id == channel.owner;
  return {
    id,
    playlist: playlist.map(video => videoData(video, user)),
    owner: isOwner
  };
};

const videoData = (video, user) => {
  const { videoId, votes, score } = video;
  const myVote = (user && votes.find(vote => user.id == vote.voter)) || {
    vote: null
  };
  return { videoId, score, vote: myVote.vote };
};

const callAndSendChannelData = async (req, res, serviceCall, ...args) => {
  try {
    const channel = await serviceCall(...args);
    if (channel) {
      const data = channelData(channel, req.user);
      res.send(data);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(422).send(err);
  }
};

module.exports = {
  index: async (req, res) => {
    const { id } = req.query;
    const filter = id ? { _id: id } : {};
    const channels = await channelService.find(filter);
    const data = channels.map(channel => channelData(channel, req.user));
    res.send(data);
  },

  show: async (req, res) => {
    const { channelId } = req.params;
    callAndSendChannelData(req, res, channelService.get, channelId);
  },

  create: async (req, res) => {
    callAndSendChannelData(req, res, channelService.create, {
      owner: req.user
    });
  },

  addVideo: async (req, res) => {
    const { channelId } = req.params;
    const { videoId } = req.body;
    callAndSendChannelData(
      req,
      res,
      channelService.addVideo,
      channelId,
      videoId
    );
  },

  nextVideo: async (req, res) => {
    const { channelId } = req.params;
    callAndSendChannelData(req, res, channelService.nextVideo, channelId);
  },

  moveVideo: async (req, res) => {
    const { channelId } = req.params;
    const { from, to } = req.body;
    callAndSendChannelData(
      req,
      res,
      channelService.moveVideo,
      channelId,
      from,
      to
    );
  },

  removeVideo: async (req, res) => {
    const { channelId } = req.params;
    const { index } = req.body;
    callAndSendChannelData(
      req,
      res,
      channelService.removeVideo,
      channelId,
      index
    );
  },

  upvote: async (req, res) => {
    const { channelId } = req.params;
    const { index } = req.body;
    callAndSendChannelData(
      req,
      res,
      channelService.vote,
      channelId,
      index,
      req.user,
      +1
    );
  },

  downvote: async (req, res) => {
    const { channelId } = req.params;
    const { index } = req.body;
    callAndSendChannelData(
      req,
      res,
      channelService.vote,
      channelId,
      index,
      req.user,
      -1
    );
  }
};
