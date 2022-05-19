const { getAllCategories } = require("../models/categoryAndTag.model");
const asyncHandler = require("../middleware/async");

// @desc    Get all tags
// @routes  GET /api/comments/test
// @access  Public
exports.httpGetAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await getAllCategories();
  res.status(200).json({
    success: true,
    data: categories,
  });
});
