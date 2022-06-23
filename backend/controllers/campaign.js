const Campaign = require("../models/Campaign");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const CampaignTemp = require("../models/CampaignTemp");

// @desc    Get all campaigns
// @routes  GET /api/campaigns/
// @access  Public
exports.getCampaigns = asyncHandler(async (req, res, next) => {
  const campaigns = await Campaign.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    data: campaigns,
  });
});

// @desc    Get latest campaigns
// @routes  GET /api/campaigns/latest
// @access  Public
exports.getLatestCampaigns = asyncHandler(async (req, res, next) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 }).limit(8);

  if (!campaigns) {
    return next(new ErrorResponse("There are no campaigns currently"), 404);
  }

  res.status(200).json({
    success: true,
    data: campaigns,
  });
});

// @desc    Get single campaign
// @routes  GET /api/campaigns/:id
// @access  Public
exports.getCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);

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

// @desc    Create campaigns
// @routes  POST /api/campaigns
// @access  Private [user]
exports.createCampaign = asyncHandler(async (req, res, next) => {
  // Add logged in user to req.body
  // req.body.user = req.user.id;

  // Find all campaigns

  let campaigns = await Campaign.find();

  // Check if the current user has a temporary saved campaign
  const tempCampaign = await CampaignTemp.findOne({ user: req.user.id });

  if (!tempCampaign) {
    return next(
      new ErrorResponse(
        `No temporary campaign belonging to user  ${req.user.id}`,
        404
      )
    );
  }

  // if it does, add it to the array of campaigns
  campaigns = [...campaigns, tempCampaign];

  // const test = new Campaign(tempCampaign);

  campaigns = await Campaign.updateMany(tempCampaign);

  res.status(200).json({
    success: true,
    data: campaigns,
  });

  // Generate random name
});

// @desc    Update campaign
// @routes  PUT /api/campaign/:id
// @access  Private [admin]
exports.updateCampaign = asyncHandler(async (req, res, next) => {
  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You cannot update an existing campaign`, 404)
    );
  }

  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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

// @desc    End a campaign
// @routes  PUT /api/campaign/:id
// @access  Private [admin, user]
exports.endACampaign = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await Campaign.findById(req.params.id);
  // Check if user ending campaign is the current user or admin
  if (campaign.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `You are not allowed to end campaign for user ${campaign.user}`,
        404
      )
    );
  }

  campaign = await Campaign.findByIdAndUpdate(
    req.params.id,
    { endCampaign: true },
    {
      new: true,
      runValidators: true,
    }
  );

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

// @desc    Delete campaign
// @routes  DELETE /api/campaigns/:id
// @access  Private [admin]
exports.deleteCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign with the id of ${req.params.id}`, 404)
    );
  }

  campaign.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
