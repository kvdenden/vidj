const channelService = require("../services/channelService");

module.exports = {
  index: async (req, res) => {
    const channels = await channel.index();
    res.send(channels);
  },

  show: async (req, res) => {
    const { channelId } = req.params;
    const channel = await channelService.show(channelId);
    if (channel) {
      res.send(channel);
    } else {
      res.status(404).send();
    }
  },

  create: async (req, res) => {
    const { title } = req.body;
    try {
      const channel = channelService.create({ title });
      res.send(channel);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  addSong: async (req, res) => {
    const { channelId } = req.params;
    const { videoId } = req.body;
    const channel = await channelService.addSong(channelId, videoId);
    if (channel) {
      res.send(channel);
    } else {
      res.status(404).send();
    }
  },

  nextSong: async (req, res) => {
    const { channelId } = req.params;
    const channel = await channelService.nextSong(channelId);
    if (channel) {
      res.send(channel);
    } else {
      res.status(404).send();
    }
  },

  moveSong: async (req, res) => {
    const { channelId } = req.params;
    const { from, to } = req.body;

    const channel = await channelService.moveSong(channelId, from, to);
    if (channel) {
      res.send(channel);
    } else {
      res.status(404).send();
    }
  }
};
