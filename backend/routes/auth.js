const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  register,
  login,
  getMe,
  logout,
  getUserCampaigns,
  getUserCampaign,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/logout").get(protect, logout);

router.route("/campaigns").get(protect, getUserCampaigns);
router.route("/campaigns/:id").get(protect, getUserCampaign);

module.exports = router;
