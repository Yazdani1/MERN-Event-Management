const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();
const { createEvent } = require("../controller/eventpost");

router.post("/create-event", requireLogin, createEvent);

module.exports = router;
