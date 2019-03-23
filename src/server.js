const mongoose = require("mongoose");
const socketio = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");

const channelRoutes = require("./routes/channels");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/vidj", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

const app = express();
app.use(bodyParser.json());
app.use("/channels", channelRoutes);

const server = app.listen(8080);
const io = socketio(server);

module.exports = { server, io };
