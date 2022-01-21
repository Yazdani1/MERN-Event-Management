const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();

const {
  joinEvent,
  joineventApplication,
  joinedeventList,
  removejoinedeventList,
} = require("../controller/joinevents");

//to join events api end point

router.put("/join-event", requireLogin, joinEvent);
router.get("/join-event-application/:id", requireLogin, joineventApplication);

//the event user have joined..
router.post("/joined-events", requireLogin, joinedeventList);
router.put("/remove-joined-events", requireLogin, removejoinedeventList);

module.exports = router;
