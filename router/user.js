const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();

const {
  userRegistration,
  userLogin,
  passwordReset,
  newPassword,
} = require("../controller/userauth");

const {
  getallUsers,
  getallEventorganizers,
  userspublicProfile
} = require("../controller/userinfo");

//Userauth

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.post("/reset-password", passwordReset);

router.post("/new-password", newPassword);
router.get("/getall-users", getallUsers);
router.get("/getall-eventorganizers", getallEventorganizers);
router.get("/eventusers-public-profile/:id", userspublicProfile);

module.exports = router;
