const { getAllTags } = require("../models/categoryAndTag.model");
const asyncHandler = require("../middleware/async");

// @desc    Get all tags
// @routes  GET /api/comments/test
// @access  Public
exports.httpGetAllTags = asyncHandler(async (req, res, next) => {
  const tags = await getAllTags();
  res.status(200).json({
    success: true,
    data: tags,
  });
});
