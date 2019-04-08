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
    const channels = await channelService.find({ owner: req.user });
    const data = channels.map(channel => channelPresenter(channel, req.user));
    res.send(data);
  },

  check: async (req, res) => {
    const { id } = req.query;
    const channels = await channelService.find({ _id: id });
    console.log(channels);
    res.send(channels.length > 0);
  },

  show: async (req, res) => {
    const { channelId } = req.params;
    callAndSendChannel(req, res, channelService.get, channelId);
  },

  create: async (req, res) => {
    const { title } = req.body;
    callAndSendChannel(req, res, channelService.create, {
      title,
      owner: req.user
    });
  },

  delete: async (req, res) => {
    const { channelId } = req.params;
    channelService.delete(channelId);
    res.status(204).send();
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
