const express = require("express");
const router = express.Router();
const {
  getTempCampaigns,
  createTempCampaign,
  getTempCampaign,
  updateTempCampaign,
  addTempCampaignPerk,
  addTempCampaignPerkItem,
  addTempCampaignPerkShipping,
  addTempCampaignFaq,
  updateTempCampaignFaq,
  updateTempCampaignPerk,
  updateTempCampaignPerkItem,
  updateTempCampaignPerkShipping,
  deleteTempCampaignFaq,
  deleteTempCampaignPerk,
  deleteTempCampaign,
  deleteTempCampaignPerkItem,
  deleteTempCampaignPerkShipping,
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

router
  .route("/:userId/perk/:perkId/item")
  .post(protect, addTempCampaignPerkItem);

router
  .route("/:userId/perk/:perkId/item/:itemId")
  .put(protect, updateTempCampaignPerkItem)
  .delete(protect, deleteTempCampaignPerkItem);

router
  .route("/:userId/perk/:perkId/ship")
  .post(protect, addTempCampaignPerkShipping);

router
  .route("/:userId/perk/:perkId/ship/:shipId")
  .put(protect, updateTempCampaignPerkShipping)
  .delete(protect, deleteTempCampaignPerkShipping);

module.exports = router;
