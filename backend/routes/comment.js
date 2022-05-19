const express = require("express");
const router = express.Router();
const {
  testComments,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  addReply,
  deleteReply,
  likeComment,
  unlikeComment,
} = require("../controllers/comment");
const { protect, authorize } = require("../middleware/auth");

router.route("/test").get(testComments);

router
  .route("/:campaignId")
  .get(getComments)
  .post(protect, authorize("admin", "user"), createComment);

router
  .route("/:campaignId/:id")
  .put(protect, authorize("admin", "user"), updateComment)
  .delete(protect, authorize("admin", "user"), deleteComment);

router
  .route("/:campaignId/reply/:id")
  .post(protect, authorize("admin", "user"), addReply);

router
  .route("/:campaignId/reply/:id/:replyId")
  .delete(protect, authorize("admin", "user"), deleteReply);

router
  .route("/:campaignId/like/:id/")
  .post(protect, authorize("admin", "user"), likeComment);

router
  .route("/:campaignId/unlike/:id/")
  .post(protect, authorize("admin", "user"), unlikeComment);

module.exports = router;
