const express = require("express");
const router = express.Router();
const { httpGetAllTags } = require("../controllers/tag");

router.route("/").get(httpGetAllTags);

module.exports = router;
