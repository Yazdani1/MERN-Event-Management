const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
require("dotenv").config();

const {
  userRegistration,
  userLogin,
  passwordReset,
  newPassword,
} = require("../controller/userauth");

const { getallUsers } = require("../controller/userinfo");

//Userauth

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.post("/reset-password", passwordReset);

router.post("/new-password", newPassword);
router.get("/getall-users", getallUsers);

module.exports = router;
