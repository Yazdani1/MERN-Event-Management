const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();

const { joinEvent, joineventApplication } = require("../controller/joinevents");

//to join events api end point

router.put("/join-event", requireLogin, joinEvent);
router.get("/join-event-application/:id", requireLogin, joineventApplication);

module.exports = router;
