const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { protect, authorize } = require("../middleware/auth");

router.route("/").get(protect, authorize("admin"), getUsers);

router
  .route("/:id")
  .get(getUser)
  .put(protect, authorize("admin", "user"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
