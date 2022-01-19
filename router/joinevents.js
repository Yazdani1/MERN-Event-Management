const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();

const { joinEvent } = require("../controller/joinevents");

//to join events api end point

router.put("/join-event", requireLogin, joinEvent);

module.exports = router;
