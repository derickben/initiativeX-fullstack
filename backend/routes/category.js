const express = require("express");
const router = express.Router();
const { httpGetAllCategories } = require("../controllers/category");

router.route("/").get(httpGetAllCategories);

module.exports = router;
