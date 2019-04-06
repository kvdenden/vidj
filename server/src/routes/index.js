const router = require("express").Router();

const authRoutes = require("./auth");
const channelRoutes = require("./channels");

router.use("/auth", authRoutes);
router.use("/channels", channelRoutes);

module.exports = router;
