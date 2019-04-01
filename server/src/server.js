const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bearerToken = require("express-bearer-token");

const authMiddleware = require("./middleware/auth");

const authRoutes = require("./routes/auth");
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
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(bearerToken());

app.use(authMiddleware);

app.use("/auth", authRoutes);
app.use("/channels", channelRoutes);

const server = app.listen(8080);

module.exports = server;
