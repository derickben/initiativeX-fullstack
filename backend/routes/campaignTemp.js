const express = require("express");
const router = express.Router();
const {
  getTempCampaigns,
  createTempCampaign,
  getTempCampaign,
  updateTempCampaign,
  addTempCampaignPerk,
  addTempCampaignFaq,
  updateTempCampaignFaq,
  updateTempCampaignPerk,
  deleteTempCampaignFaq,
  deleteTempCampaignPerk,
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

router.route("/:userId/faq").post(protect, addTempCampaignFaq);

router
  .route("/:userId/faq/:faqId")
  .put(protect, updateTempCampaignFaq)
  .delete(protect, deleteTempCampaignFaq);

router.route("/:userId/perk").post(protect, addTempCampaignPerk);

router
  .route("/:userId/perk/:perkId")
  .put(protect, updateTempCampaignPerk)
  .delete(protect, deleteTempCampaignPerk);

module.exports = router;
