const express = require("express");
const router = express.Router();
const {
  getCampaigns,
  getLatestCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  endACampaign,
  deleteCampaign,
} = require("../controllers/campaign");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getCampaigns)
  .post(protect, authorize("admin", "user"), createCampaign);

router.route("/latest").get(getLatestCampaigns);

router
  .route("/:id")
  .get(getCampaign)
  .put(protect, authorize("admin"), updateCampaign)
  .delete(protect, authorize("admin"), deleteCampaign);

router.route("/end/:id").put(protect, authorize("admin", "user"), endACampaign);

module.exports = router;
