const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
const {
  userRegistration,
  userLogin,
  passwordReset,
  newPassword,
} = require("../controller/userauth");

//Userauth

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.post("/reset-password", passwordReset);

router.post("/new-password", newPassword);

module.exports = router;
