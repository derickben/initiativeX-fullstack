const CampaignTemp = require("../models/CampaignTemp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// @desc    Get all temporary campaigns
// @routes  GET /api/campaigns-temp/
// @access  Admin
exports.getTempCampaigns = asyncHandler(async (req, res, next) => {
  const campaigns = await CampaignTemp.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    data: campaigns,
  });
});

// @desc    Get single temporary campaign
// @routes  GET /api/campaigns-temp/:id
// @access  Private [user]
exports.getTempCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await CampaignTemp.findOne({ user: req.params.id });

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

// @desc    Create temporary campaigns
// @routes  POST /api/campaigns-temp
// @access  Private [user]
exports.createTempCampaign = asyncHandler(async (req, res, next) => {
  // Add logged in user to req.body
  req.body.user = req.user.id;

  let existingTempCampaign = await CampaignTemp.findOne({ user: req.user.id });

  // Check if the user has a temporary campaign already created

  // if the user has, update the campaign instead of saving
  if (existingTempCampaign) {
    existingTempCampaign = await CampaignTemp.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: existingTempCampaign,
    });
  } else {
    const campaign = await CampaignTemp.create(req.body);

    res.status(200).json({
      success: true,
      data: campaign,
    });
  }
});

// @desc    Update temporary campaign
// @routes  PUT /api/campaign-temp/:id
// @access  Private [user]
exports.updateTempCampaign = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findById(req.params.id);

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign with the id of ${req.params.id}`, 404)
    );
  }

  // Check if user updating campaign is the campaign owner or admin
  if (campaign.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `You are not allowed to update the campaign for user ${campaign.user}`,
        404
      )
    );
  }

  campaign = await CampaignTemp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: campaign,
  });
});

// @desc    Add FAQ to a temporary campaign
// @routes  POST /api/campaign-temp/:userId/faq/
// @access  Private [user]
exports.addTempCampaignFaq = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({ user: req.params.userId });

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign with the id of ${req.params.id}`, 404)
    );
  }

  // Check if user updating campaign is the campaign owner or admin
  if (campaign.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `You are not authorized to update the campaign for user ${campaign.user}`,
        404
      )
    );
  }

  const newFaq = {
    question: req.body.question,
    answer: req.body.answer,
  };

  // Add newFaq to end of faqs array
  campaign.faqs.push(newFaq);

  // Save
  const newCampaign = await campaign.save();

  res.status(200).json({
    success: true,
    message: "FAQ added successfully",
    data: { campaign: campaign.faqs },
  });
});

// @desc    Update FAQ in temporary campaign
// @routes  PUT /api/campaign-temp/:userId/faq/:faqId
// @access  Private [user]
exports.updateTempCampaignFaq = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({ user: req.params.userId });

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign with the id of ${req.params.id}`, 404)
    );
  }

  // Check if user updating campaign is the campaign owner or admin
  if (campaign.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `You are not authorized to update the campaign for user ${campaign.user}`,
        404
      )
    );
  }

  // Check to see if FAQ exist
  if (
    campaign.faqs.filter((faq) => faq._id.toString() === req.params.faqId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No FAQ with the id of ${req.params.faqId}`, 404)
    );
  }

  // Get update index
  const faqIndex = campaign.faqs
    .map((faq) => faq._id.toString())
    .indexOf(req.params.faqId);

  // Splice faq to update array
  const updatedFaq = campaign.faqs.splice(faqIndex, 1, req.body);

  const newCampaign = await campaign.save();

  res.status(200).json({
    success: true,
    message: "FAQ updated successfully",
    data: { updatedFaq, faq: newCampaign.faq },
  });
});

// @desc    Delete FAQ in temporary campaign
// @routes  DELETE /api/campaign-temp/:userId/faq/:faqId
// @access  Private [user]
exports.deleteTempCampaignFaq = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({ user: req.params.userId });

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign with the id of ${req.params.id}`, 404)
    );
  }

  // Check if user deleting campaign is the campaign owner or admin
  if (campaign.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `You are not authorized to update the campaign for user ${campaign.user}`,
        404
      )
    );
  }

  // Check to see if FAQ exist
  if (
    campaign.faqs.filter((faq) => faq._id.toString() === req.params.faqId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No FAQ with the id of ${req.params.id}`, 404)
    );
  }

  // Get delete index
  const faqIndex = campaign.faqs
    .map((faq) => faq._id.toString())
    .indexOf(req.params.faqId);

  // Splice faq out of array
  const deletedFaq = campaign.faqs.splice(faqIndex, 1);

  const newCampaign = await campaign.save();

  res.status(200).json({
    success: true,
    message: "FAQ deleted successfully",
    data: { deletedFaq, faq: newCampaign.faq },
  });
});

// @desc    Delete temporary campaign
// @routes  DELETE /api/campaigns-temp/:id
// @access  Private [admin]
exports.deleteTempCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await CampaignTemp.findById(req.params.id);

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
