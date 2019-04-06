const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bearerToken = require("express-bearer-token");

const { API_PATH, PORT, MONGODB_URI, MONGODB_DBNAME } = require("./config");

const authMiddleware = require("./middleware/auth");

const routes = require("./routes");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DBNAME,
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

app.use(API_PATH, routes);

const server = app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

module.exports = server;
