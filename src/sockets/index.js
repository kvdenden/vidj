const socketio = require("socket.io");
const server = require("../server");
const User = require("../models/User");
const Channel = require("../models/Channel");
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
  let user;
  socket.on("auth", async token => {
    user = await User.findOne({ token });
    console.log(`${socket.id} auth as user ${user}`);
  });

  socket.on("joinChannel", async channelId => {
    console.log(`${socket.id} joined channel ${channelId}`);
    socket.join(channelId);
    const channel = await Channel.findById(channelId);
    if (user.id == channel.owner) {
      socket.emit("setMaster", true);
    }
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
