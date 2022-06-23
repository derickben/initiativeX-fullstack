const express = require("express");
const router = express.Router();
const {
  completeTempCampaign,
  getTempCampaigns,
  createTempCampaign,
  getTempCampaign,
  getTempCampaignAllPerkItems,
  getTempCampaignAllPerkShippings,
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
  .route("/complete")
  .post(protect, authorize("admin", "user"), completeTempCampaign);

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
  .route("/:userId/perk/all/items")
  .get(protect, authorize("admin", "user"), getTempCampaignAllPerkItems);

router
  .route("/:userId/perk/all/shippings")
  .get(protect, authorize("admin", "user"), getTempCampaignAllPerkShippings);

router
  .route("/:userId/perk/:perkId/item")
  .post(protect, authorize("admin", "user"), addTempCampaignPerkItem);

router
  .route("/:userId/perk/:perkId/item/:itemId")
  .put(protect, authorize("admin", "user"), updateTempCampaignPerkItem)
  .delete(protect, authorize("admin", "user"), deleteTempCampaignPerkItem);

router
  .route("/:userId/perk/:perkId/shipping")
  .post(protect, authorize("admin", "user"), addTempCampaignPerkShipping);

router
  .route("/:userId/perk/:perkId/shipping/:shipId")
  .put(protect, authorize("admin", "user"), updateTempCampaignPerkShipping)
  .delete(protect, authorize("admin", "user"), deleteTempCampaignPerkShipping);

module.exports = router;
