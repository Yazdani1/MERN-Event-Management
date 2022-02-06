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
  addtoWishlist,
  removeeventWishlist,
  getwishlistPost,
} = require("../controller/userinfo");
const { route } = require("express/lib/application");

//Userauth

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.post("/reset-password", passwordReset);

router.post("/new-password", newPassword);
//end user auth

router.get("/getall-users", getallUsers);
router.get("/getall-eventorganizers", getallEventorganizers);
router.get("/eventusers-public-profile/:id", userspublicProfile);
router.post("/search-eventorganizers", serachEventorganizers);

//loged in user information

router.get("/logedinuser-allinfo", requireLogin, logedinuserInfo);

//send message to user
router.post("/send-message", requireLogin, sendMessage);

//event wishlist

router.put("/event-wishlist", requireLogin, addtoWishlist);
router.put("/remove-event-wishlist", requireLogin, removeeventWishlist);

//to get event wishlist
router.get("/get-wishlist", requireLogin, getwishlistPost);

module.exports = router;
