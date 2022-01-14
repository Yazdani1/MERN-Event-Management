const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();
const { createEvent, getEvent } = require("../controller/eventpost");

router.post("/create-event", requireLogin, createEvent);
router.get("/get-allevent", requireLogin, getEvent);

module.exports = router;
