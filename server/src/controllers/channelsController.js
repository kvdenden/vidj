const channelService = require("../services/channelService");
const channelPresenter = require("../presenters/channelPresenter");

const callAndSendChannel = async (req, res, serviceCall, ...args) => {
  try {
    const channel = await serviceCall(...args);
    if (channel) {
      const data = channelPresenter(channel, req.user);
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
    const data = channels.map(channel => channelPresenter(channel, req.user));
    res.send(data);
  },

  show: async (req, res) => {
    const { channelId } = req.params;
    callAndSendChannel(req, res, channelService.get, channelId);
  },

  create: async (req, res) => {
    callAndSendChannel(req, res, channelService.create, {
      owner: req.user
    });
  },

  addVideo: async (req, res) => {
    const { channelId } = req.params;
    const { videoId } = req.body;
    callAndSendChannel(req, res, channelService.addVideo, channelId, videoId);
  },

  nextVideo: async (req, res) => {
    const { channelId } = req.params;
    callAndSendChannel(req, res, channelService.nextVideo, channelId);
  },

  moveVideo: async (req, res) => {
    const { channelId } = req.params;
    const { from, to } = req.body;
    callAndSendChannel(req, res, channelService.moveVideo, channelId, from, to);
  },

  removeVideo: async (req, res) => {
    const { channelId } = req.params;
    const { index } = req.body;
    callAndSendChannel(req, res, channelService.removeVideo, channelId, index);
  },

  upvote: async (req, res) => {
    const { channelId } = req.params;
    const { index } = req.body;
    callAndSendChannel(
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
    callAndSendChannel(
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
