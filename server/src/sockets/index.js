const socketio = require("socket.io");
const server = require("../server");
const User = require("../models/User");

const wrapChannelService = require("./wrapChannelService");

const syncMaster = require("./syncMaster");
const syncVideoStatus = require("./syncVideoStatus");

const io = socketio(server);

wrapChannelService(io);

io.on("connection", socket => {
  console.log(`${socket.id} connected`);

  socket.on("auth", async (token, callback) => {
    const user = await User.findOne({ token });
    console.log(`${socket.id} auth as user ${user}`);
    if (callback) {
      const authenticated = !!user;
      callback(authenticated);
    }
  });

  socket.on("joinChannel", async channelId => {
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

  syncMaster(socket);
  syncVideoStatus(socket);
});

module.exports = io;
