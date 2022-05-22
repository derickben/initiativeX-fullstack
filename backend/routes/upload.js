const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/upload");
const { protect, authorize } = require("../middleware/auth");

router.route("/").post(protect, authorize("admin", "user"), uploadFile);

module.exports = router;
