const express = require("express");
const router = express.Router();
const { initiatePayment, verifyPayment } = require("../controllers/donors");
const { protect, authorize } = require("../middleware/auth");

router.route("/:campaignId").post(initiatePayment);

router.route("/:campaignId/:ref").get(verifyPayment);

module.exports = router;
