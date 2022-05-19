const User = require("../models/User");
const Campaign = require("../models/Campaign");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Register user
// @routes  POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  // Validate password
  if (password !== passwordConfirm) {
    return next(new ErrorResponse(`Passwords must match`, 400));
  }

  const user = await User.create(req.body);

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @routes  POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  // Check if user exist
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorResponse(`Invalid credentials`, 401));

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401));

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @routes  GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Log user out / clear cookie
// @routes  GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000), // expires in 10secs
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get all campaigns associated with a user
// @routes  GET /api/auth/campaign
// @access  Private
exports.getUserCampaigns = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.find({ user: req.user.id });

  if (!campaign) {
    return next(new ErrorResponse("There are no campaign currently", 404));
  }

  res.status(200).json({
    success: true,
    data: campaign,
    length: campaign.length,
  });
});

// @desc    Get single campaign associated with a user
// @routes  GET /api/auth/campaigns/:id
// @access  Private
exports.getUserCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.findOne({ user: req.user.id });

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: campaign,
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
