const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all users
// @routes  GET /api/users/
// @access  Private [admin]
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().populate("campaigns").sort({ name: 1 });

  // Check if user is an admin
  if (req.user.role !== "admin") {
    {
      return next(
        new ErrorResponse(`You are not allowed to view all users`, 404)
      );
    }
  }

  if (!users) {
    return next(new ErrorResponse("There are no users currently", 404));
  }

  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc    Get single user
// @routes  GET /api/users/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: "campaigns",
    select: "title photo desc",
  });

  if (!user) {
    return next(
      new ErrorResponse(`No user with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @routes  PUT /api/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`No user with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure current user is updating itself
  if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this user`,
        401
      )
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete user
// @routes  DELETE /api/users
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // Make sure user is admin
  if (req.user.role !== "admin") {
    {
      return next(new ErrorResponse(`You are not allowed to delete user`, 404));
    }
  }

  if (!user) {
    return next(
      new ErrorResponse(`No user with the id of ${req.params.id}`, 404)
    );
  }

  user.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
