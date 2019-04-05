const channelService = require("../services/channelService");

const serviceMethods = [
  "addVideo",
  "nextVideo",
  "moveVideo",
  "removeVideo",
  "vote"
];

module.exports = io => {
  const broadcastPlaylistChange = channel => {
    const channelId = channel.id;
    io.to(channelId).emit("playlistChange", channelId, channel.playlist);
  };

  serviceMethods.forEach(method => {
    const originalMethod = channelService[method];
    const wrappedMethod = async (...args) => {
      const result = await originalMethod(...args);
      console.log(`broadcasting channel update: ${method}`);
      broadcastPlaylistChange(result);
      return result;
    };
    channelService[method] = wrappedMethod;
  });
};
