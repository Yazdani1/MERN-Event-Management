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
  userspublicProfile,
  serachEventorganizers,
  logedinuserInfo,
  sendMessage,
} = require("../controller/userinfo");

//Userauth

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.post("/reset-password", passwordReset);

router.post("/new-password", newPassword);
router.get("/getall-users", getallUsers);
router.get("/getall-eventorganizers", getallEventorganizers);
router.get("/eventusers-public-profile/:id", userspublicProfile);
router.post("/search-eventorganizers", serachEventorganizers);

//loged in user information

router.get("/logedinuser-allinfo", requireLogin, logedinuserInfo);

//send message to user

router.post("/send-message", requireLogin, sendMessage);

module.exports = router;
