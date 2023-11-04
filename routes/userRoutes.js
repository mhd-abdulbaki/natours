// @Third Party
const express = require("express");

// @Dev
// #User Controllers
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  // resizeUserPhoto,
} = require("../controllers/userController");

// #Auth Controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require("../controllers/authController");

// @Router Initialization
const router = express.Router();

// @Public Route
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// @Protected Routes
router.use(protect);

router.patch("/update-password", updatePassword);

router.get("/me", getMe, getUser);
router.patch("/me", uploadUserPhoto, updateMe);
router.delete("/me", deleteMe);

// @Routes Require Admin Permission
router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
