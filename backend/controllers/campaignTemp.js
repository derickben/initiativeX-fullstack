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
  const doesUserHaveExistingTempCampaign = async () => {
    let isTempCampaignExisting = false;

    // if the user has, update the campaign instead of saving
    if (existingTempCampaign) {
      isTempCampaignExisting = true;

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

      return isTempCampaignExisting;
    }

    return isTempCampaignExisting;
  };

  if (!req.files) {
    if (await doesUserHaveExistingTempCampaign()) {
      return;
    }

    campaign = await CampaignTemp.create(req.body);
    res.status(200).json({
      success: true,
      data: campaign,
    });
    return;
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
        if (doesUserHaveExistingTempCampaign()) {
          return;
        }
        campaign = await CampaignTemp.create(req.body);
      } catch (error) {
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
