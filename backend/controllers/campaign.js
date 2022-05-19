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
  req.body.user = req.user.id;

  if (!req.files) {
    return next(new ErrorResponse(`Please include a file`, 400));
  }

  const file = req.files["photo"];

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // check Filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Generate random name
  crypto.randomBytes(16, (err, buf) => {
    if (err) {
      // Prints error
      console.log(err);
      return;
    }
    file.name = buf.toString("hex") + path.extname(file.name);
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      req.body.photo = file.name;
      let campaign;
      let pathToFile = `${process.env.FILE_UPLOAD_PATH}/${file.name}`;

      // campaign = await Campaign.create(req.body);

      try {
        campaign = await Campaign.create(req.body);

        // Delete campaignTemp after saving main campaign
        const campaignTemp = await CampaignTemp.findOne({ user: req.user.id });

        await campaignTemp.remove();
      } catch (error) {
        // If campaign creation fails, delete image
        try {
          fs.unlinkSync(pathToFile);
          console.log("Successfully deleted the file");
        } catch (error) {
          return next(new ErrorResponse(error, 404));
        }
        return next(new ErrorResponse(error, 404));
      }

      res.status(200).json({
        success: true,
        data: campaign,
      });
    });
  });
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
