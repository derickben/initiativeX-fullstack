const express = require("express");
const router = express.Router();
const {
  getTempCampaigns,
  createTempCampaign,
  getTempCampaign,
  updateTempCampaign,
  deleteTempCampaign,
} = require("../controllers/campaignTemp");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("admin"), getTempCampaigns)
  .post(protect, authorize("admin", "user"), createTempCampaign);

router
  .route("/:id")
  .get(protect, getTempCampaign)
  .put(protect, updateTempCampaign)
  .delete(protect, authorize("admin"), deleteTempCampaign);

module.exports = router;
