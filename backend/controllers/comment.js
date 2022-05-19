const Comment = require("../models/Comment");
const Campaign = require("../models/Campaign");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Test comment route
// @routes  GET /api/comments/test
// @access  Public
exports.testComments = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "This route is working",
  });
});

// @desc    Get comments associated with a single campaign
// @routes  GET /api/comments/:campaignId
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  const comments = await Comment.find({
    campaign: mongoose.Types.ObjectId(req.params.campaignId),
  }).sort({ createdAt: -1 });

  if (!comments) {
    return next(new ErrorResponse("There are no comments currently"), 404);
  }

  res.status(200).json({
    success: true,
    data: comments,
  });
});

// @desc    Create comment
// @routes  POST /api/comments/:campaignId
// @access  Private [user, admin]
exports.createComment = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  // A comment must be associated with a user and a campaign

  const newComment = new Comment({
    text: req.body.text,
    user: req.user.id,
    campaign: campaign._id,
  });

  const comment = await newComment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    Update comment
// @routes  PUT /api/comments/:campaignId/:id
// @access  Private [admin, user]
exports.updateComment = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }
  // Make sure logged in user is the owner of the comment or an admin
  if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You are not authorized to update this comment`, 404)
    );
  }

  comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    Delete a comment
// @routes  DELETE /api/comments/:campaignId/:id
// @access  Private [admin, user]
exports.deleteComment = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure logged in user is the owner of the comment or an admin
  if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You are not authorized to update this comment`, 404)
    );
  }

  comment.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Add reply to a comment
// @routes  POST /api/comments/:campaignId/reply/:id
// @access  Private [admin, user]
exports.addReply = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  const newReply = {
    text: req.body.text,
    user: req.user.id,
    campaign: campaign._id,
  };

  // Add newReply to beginning of replies array
  comment.replies.unshift(newReply);

  // Save
  const newComment = await comment.save();

  res.status(200).json({
    success: true,
    data: newComment,
  });
});

// @desc    Delete reply from a comment
// @routes  POST /api/comments/:campaignId/reply/:id/:replyId
// @access  Private [admin, user]
exports.deleteReply = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Check to see if reply exist
  if (
    comment.replies.filter(
      (reply) => reply._id.toString() === req.params.replyId
    ).length === 0
  ) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Get remove index
  const replyIndex = comment.replies
    .map((reply) => reply._id.toString())
    .indexOf(req.params.replyId);

  // Make sure logged in user is the owner of the reply or an admin
  if (
    comment.replies[replyIndex].user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`You are not authorized to delete this comment`, 404)
    );
  }

  // Splice reply out of array
  const deletedReply = comment.replies.splice(replyIndex, 1);

  const newComment = await comment.save();

  res.status(200).json({
    success: true,
    data: { deletedReply, newComment },
  });
});

// @desc    Like a comment
// @routes  POST /api/comments/:campaignId/like/:id
// @access  Private [admin, user]
exports.likeComment = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  if (
    comment.likes.filter((like) => like.user.toString() === req.user.id)
      .length > 0
  ) {
    return next(new ErrorResponse("User already liked this post", 400));
  }

  // Add user id to likes array
  comment.likes.unshift({ user: req.user.id });

  const newLike = await comment.save();

  res.status(200).json({
    success: true,
    data: newLike,
  });
});

// @desc    unLike a comment
// @routes  POST /api/comments/:campaignId/unlike/:id
// @access  Private [admin, user]
exports.unlikeComment = asyncHandler(async (req, res, next) => {
  // Make sure campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(new ErrorResponse("Campaign does not exist"), 404);
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  if (
    comment.likes.filter((like) => like.user.toString() === req.user.id)
      .length === 0
  ) {
    return next(new ErrorResponse("You are yet to like this post", 400));
  }

  // Get like index
  const likeIndex = comment.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  // Splice user out of like array
  const removedLike = comment.likes.splice(likeIndex, 1);

  // Save
  const newComment = await comment.save();

  res.status(200).json({
    success: true,
    data: { removedLike, newComment },
  });
});
