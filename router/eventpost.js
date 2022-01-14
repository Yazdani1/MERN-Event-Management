const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();
const {
  createEvent,
  getmyEvents,
  getallEvents,
  deletemyEvents
} = require("../controller/eventpost");

router.post("/create-event", requireLogin, createEvent);
router.get("/get-myevents", requireLogin, getmyEvents);
router.get("/get-allevents", getallEvents);
router.delete("/delete-myevents/:id", requireLogin, deletemyEvents);

module.exports = router;
