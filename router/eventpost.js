const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();
const {
  createEvent,
  getmyEvents,
  getallEvents,
  deletemyEvents,
  searchEvents,
  eventDetails,
  likeEvents,
  unlikeEvents
} = require("../controller/eventpost");

router.post("/create-event", requireLogin, createEvent);
router.get("/get-myevents", requireLogin, getmyEvents);
router.get("/get-allevents", getallEvents);
router.delete("/delete-myevents/:id", requireLogin, deletemyEvents);

router.post("/search-events", searchEvents);

//events details

router.get("/event-details/:id", eventDetails);

//like and unlike events
router.put("/like", requireLogin, likeEvents);
router.put("/unlike", requireLogin, unlikeEvents);

module.exports = router;
