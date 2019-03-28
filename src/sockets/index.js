const socketio = require("socket.io");
const server = require("../server");
const channelService = require("../services/channelService");

const io = socketio(server);

const broadcastPlaylistChange = channel => {
  const channelId = channel.id;
  io.to(channelId).emit("playlistChange", channel.playlist);
};

["addSong", "nextSong", "moveSong"].forEach(method => {
  const originalMethod = channelService[method];
  const wrappedMethod = async (...args) => {
    const result = await originalMethod(...args);
    console.log(`broadcasting channel update: ${method}`);
    broadcastPlaylistChange(result);
    return result;
  };
  channelService[method] = wrappedMethod;
});

io.on("connection", socket => {
  console.log(`${socket.id} connected`);
  socket.on("joinChannel", channelId => {
    console.log(`${socket.id} joined channel ${channelId}`);
    socket.join(channelId);
  });

  socket.on("leaveChannel", channelId => {
    console.log(`${socket.id} left channel ${channelId}`);
    socket.leave(channelId);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

module.exports = io;
