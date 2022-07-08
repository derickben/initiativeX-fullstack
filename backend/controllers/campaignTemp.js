const CampaignTemp = require("../models/CampaignTemp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

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
  const campaign = await CampaignTemp.findOne({
    user: req.params.id,
    areAllFieldsComplete: false,
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

// @desc    Create temporary campaigns
// @routes  POST /api/campaigns-temp
// @access  Private [user]
exports.createTempCampaign = asyncHandler(async (req, res, next) => {
  // Add logged in user to req.body
  req.body.user = req.user.id;

  let existingTempCampaign = await CampaignTemp.findOne({
    user: req.user.id,
    areAllFieldsComplete: false,
  });

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

// @desc Mark a temporary campaign complete
// @routes  POST /api/campaigns-temp/complete
// @access  Private [user]
exports.completeTempCampaign = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.user.id,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(`No campaign belonging to the user ${req.user.id}`, 404)
    );
  }

  test = await CampaignTemp.findById("62b41c0ad5fa6ed9800c5c50");

  console.log(test);

  // Run check to see if all the required fields have been completed

  const {
    title,
    photo,
    desc,
    category,
    tags,
    videoLink,
    story,
    amountNeeded,
    faqs,
    duration,
    perks,
  } = campaign;

  // Validate Basics
  if (
    !title ||
    !desc ||
    !amountNeeded ||
    !photo ||
    !category ||
    !tags ||
    !duration
  ) {
    return next(
      new ErrorResponse(
        `Please complete all mandatory fields in the 'Basics' Section`,
        400
      )
    );
  }

  // Validate Content
  if (!videoLink) {
    return next(
      new ErrorResponse(
        `Please complete all mandatory fields in the 'Content' Section`,
        400
      )
    );
  }

  // Validate Faq
  if (faqs.length < 1) {
    return next(
      new ErrorResponse(
        `Please you must include a Frequently asked question`,
        400
      )
    );
  }

  // Validate Perk
  if (perks.length < 1) {
    return next(
      new ErrorResponse(
        `Please complete all mandatory fields in the 'Perk' Section`,
        400
      )
    );
  }

  // Validate items in Perk
  const isNotEmpty = (currentItem) => currentItem.items.length > 0;

  const itemIsNotEmpty = perks.every(isNotEmpty);

  if (!itemIsNotEmpty)
    return next(
      new ErrorResponse(
        `Please you must include an Item to all existing perks`,
        400
      )
    );

  campaign = await CampaignTemp.findOneAndUpdate(
    {
      user: req.user.id,
      areAllFieldsComplete: false,
    },
    { areAllFieldsComplete: true },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: campaign,
  });
});

// @desc    Update complete campaign
// @routes  PUT /api/campaign-temp/:id
// @access  Private [user]
exports.updateTempCampaign = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    _id: req.params.id,
    areAllFieldsComplete: true,
  });

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
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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
  await campaign.save();

  const allFaqs = campaign.faqs;

  res.status(200).json({
    success: true,
    message: "FAQ added successfully",
    data: allFaqs,
  });
});

// @desc    Update FAQ in temporary campaign
// @routes  PUT /api/campaign-temp/:userId/faq/:faqId
// @access  Private [user]
exports.updateTempCampaignFaq = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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
    data: { updatedFaq, faqs: newCampaign.faq },
  });
});

// @desc    Delete FAQ in temporary campaign
// @routes  DELETE /api/campaign-temp/:userId/faq/:faqId
// @access  Private [user]
exports.deleteTempCampaignFaq = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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
      new ErrorResponse(`No FAQ with the id of ${req.params.faqId}`, 404)
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
    data: { deletedFaq, faqs: newCampaign.faq },
  });
});

// @desc    Add perk to a temporary campaign
// @routes  POST /api/campaign-temp/:userId/perk/
// @access  Private [user]
exports.addTempCampaignPerk = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  const newPerk = {
    price: req.body.price,
    title: req.body.title,
    desc: req.body.desc,
    qtyAvailable: req.body.qtyAvailable,
    deliveryDate: req.body.deliveryDate,
  };

  // Add newPerk to end of perks array
  campaign.perks.push(newPerk);

  // Save
  await campaign.save();

  const allPerks = campaign.perks;

  res.status(200).json({
    success: true,
    message: "PERK added successfully",
    data: allPerks,
  });
});

// @desc    Update perk in temporary campaign
// @routes  PUT /api/campaign-temp/:userId/perk/:perkId
// @access  Private [user]
exports.updateTempCampaignPerk = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (
    campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
    );
  }

  // Get update index
  const perkIndex = campaign.perks
    .map((perk) => perk._id.toString())
    .indexOf(req.params.perkId);

  // Splice perk to update array
  const updatedPerk = campaign.perks.splice(perkIndex, 1, req.body);

  const newCampaign = await campaign.save();

  res.status(200).json({
    success: true,
    message: "PERK updated successfully",
    data: { updatedPerk, perks: newCampaign.perks },
  });
});

// @desc    Delete perk in temporary campaign
// @routes  DELETE /api/campaign-temp/:userId/perk/:perkId
// @access  Private [user]
exports.deleteTempCampaignPerk = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (
    campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
    );
  }

  // Get delete index
  const perkIndex = campaign.perks
    .map((perk) => perk._id.toString())
    .indexOf(req.params.perkId);

  // Splice perk out of array
  const deletedPerk = campaign.perks.splice(perkIndex, 1);

  const newCampaign = await campaign.save();

  res.status(200).json({
    success: true,
    message: "PERK deleted successfully",
    data: { deletedPerk, perks: newCampaign.perks },
  });
});

// @desc    Get all items in all perks
// @routes  GET /api/campaigns-temp/:userId/perk/all/items
// @access  Private [user]
exports.getTempCampaignAllPerkItems = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (campaign.perks.length === 0) {
    return next(new ErrorResponse(`${req.params.userId} has no perk yet`, 404));
  }

  // Get all items in all perks
  const itemsInAllPerks = campaign.perks.map((perk) => {
    return { perkId: perk._id.toString(), items: perk.items || [] };
  });
  // Get all items in all perks
  let allItems = campaign.perks.map((perk) => {
    return perk.items || [];
  });

  allItems = [].concat.apply([], allItems);

  res.status(200).json({
    success: true,
    data: { itemsInAllPerks, allItems },
  });
});

// @desc    Add item to perk in temporary campaign
// @routes  POST /api/campaign-temp/:userId/perk/:perkId/item
// @access  Private [user]
exports.addTempCampaignPerkItem = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (
    campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
    );
  }

  // Get perk index
  const perkIndex = campaign.perks
    .map((perk) => perk._id.toString())
    .indexOf(req.params.perkId);

  const newItem = {
    itemName: req.body.itemName,
  };

  // Add newItem to end of items array in perks array
  campaign.perks[perkIndex].items.push(newItem);

  // Save
  await campaign.save();

  // Get all items in all perks
  const itemsInAllPerks = campaign.perks.map((perk) => {
    return { perkId: perk._id.toString(), items: perk.items || [] };
  });

  // Get all items in all perks
  let allItems = campaign.perks.map((perk) => {
    return perk.items || [];
  });

  allItems = [].concat.apply([], allItems);

  res.status(200).json({
    success: true,
    message: "Item added to PERKS successfully",
    data: { itemsInAllPerks, allItems },
  });
});

// @desc    Update item in perk in temporary campaign
// @routes  PUT /api/campaign-temp/:userId/perk/:perkId/item/itemId
// @access  Private [user]
exports.updateTempCampaignPerkItem = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (
    campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
    );
  }
  // Get perk index
  const perkIndex = campaign.perks
    .map((perk) => perk._id.toString())
    .indexOf(req.params.perkId);

  // Check to see if ITEM exist inside perk
  if (
    campaign.perks[perkIndex].items.filter(
      (itemId) => itemId._id.toString() === req.params.itemId
    ).length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK_ITEM with the id of ${req.params.itemId}`, 404)
    );
  }
  // Get item index
  const itemIndex = campaign.perks[perkIndex].items
    .map((item) => item._id.toString())
    .indexOf(req.params.itemId);

  // Splice item to update array
  const updatedItem = campaign.perks[perkIndex].items.splice(
    itemIndex,
    1,
    req.body
  );

  await campaign.save();

  // Get all items in all perks
  const itemsInAllPerks = campaign.perks.map((perk) => {
    return { perkId: perk._id.toString(), items: perk.items || [] };
  });

  // Get all items in all perks
  let allItems = campaign.perks.map((perk) => {
    return perk.items || [];
  });

  allItems = [].concat.apply([], allItems);

  res.status(200).json({
    success: true,
    message: "Item in Perks updated successfully",
    data: { updatedItem, items: itemsInAllPerks, allItems },
  });
});

// @desc    Delete item in perk in temporary campaign
// @routes  DELETE /api/campaign-temp/:userId/perk/:perkId/item/itemId
// @access  Private [user]
exports.deleteTempCampaignPerkItem = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (
    campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
    );
  }
  // Get perk index
  const perkIndex = campaign.perks
    .map((perk) => perk._id.toString())
    .indexOf(req.params.perkId);

  // Check to see if ITEM exist inside perk
  if (
    campaign.perks[perkIndex].items.filter(
      (itemId) => itemId._id.toString() === req.params.itemId
    ).length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK_ITEM with the id of ${req.params.itemId}`, 404)
    );
  }
  // Get item index
  const itemIndex = campaign.perks[perkIndex].items
    .map((item) => item._id.toString())
    .indexOf(req.params.itemId);

  // Splice item out of array
  const deletedItem = campaign.perks[perkIndex].items.splice(itemIndex, 1);

  const newCampaign = await campaign.save();

  // Get all items in all perks
  let allItems = campaign.perks.map((perk) => {
    return perk.items || [];
  });

  allItems = [].concat.apply([], allItems);

  res.status(200).json({
    success: true,
    message: "ITEM in Perks deleted successfully",
    data: { deletedItem, items: newCampaign.perks[perkIndex].items, allItems },
  });
});

// @desc    Get all shippings in all perks
// @routes  GET /api/campaigns-temp/:userId/perk/all/shippings
// @access  Private [user]
exports.getTempCampaignAllPerkShippings = asyncHandler(
  async (req, res, next) => {
    let campaign;
    campaign = await CampaignTemp.findOne({
      user: req.params.userId,
      areAllFieldsComplete: false,
    });

    if (!campaign) {
      return next(
        new ErrorResponse(
          `No campaign belonging to user ${req.params.userId}`,
          404
        )
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

    // Check to see if PERK exist
    if (campaign.perks.length === 0) {
      return next(
        new ErrorResponse(`${req.params.userId} has no perk yet`, 404)
      );
    }

    // Get all shippings in all perks
    const shippingsInAllPerks = campaign.perks.map((perk) => {
      return { perkId: perk._id.toString(), shippings: perk.shippings || [] };
    });

    // Get all shippings in all perks
    let allShippings = campaign.perks.map((perk) => {
      return perk.shippings || [];
    });

    allShippings = [].concat.apply([], allShippings);

    res.status(200).json({
      success: true,
      data: { shippingsInAllPerks, allShippings },
    });
  }
);

// @desc    Add shipping to perk in temporary campaign
// @routes  POST /api/campaign-temp/:userId/perk/:perkId/shipping
// @access  Private [user]
exports.addTempCampaignPerkShipping = asyncHandler(async (req, res, next) => {
  let campaign;
  campaign = await CampaignTemp.findOne({
    user: req.params.userId,
    areAllFieldsComplete: false,
  });

  if (!campaign) {
    return next(
      new ErrorResponse(
        `No campaign belonging to user ${req.params.userId}`,
        404
      )
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

  // Check to see if PERK exist
  if (
    campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
      .length === 0
  ) {
    return next(
      new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
    );
  }

  // Get perk index
  const perkIndex = campaign.perks
    .map((perk) => perk._id.toString())
    .indexOf(req.params.perkId);

  const newShipping = {
    location: req.body.location,
    fee: req.body.fee,
  };

  // Add newShipping to end of shipping array in perks array
  campaign.perks[perkIndex].shippings.push(newShipping);

  // Save
  await campaign.save();

  // Get all shippings in all perks
  const shippingsInAllPerks = campaign.perks.map((perk) => {
    return { perkId: perk._id.toString(), shippings: perk.shippings || [] };
  });

  // Get all shippings in all perks
  let allShippings = campaign.perks.map((perk) => {
    return perk.shippings || [];
  });

  allShippings = [].concat.apply([], allShippings);

  res.status(200).json({
    success: true,
    message: "SHIPPING added to PERKS successfully",
    data: { shippingsInAllPerks, allShippings },
  });
});

// @desc    Update shipping in perk in temporary campaign
// @routes  PUT /api/campaign-temp/:userId/perk/:perkId/shipping/shipId
// @access  Private [user]
exports.updateTempCampaignPerkShipping = asyncHandler(
  async (req, res, next) => {
    let campaign;
    campaign = await CampaignTemp.findOne({
      user: req.params.userId,
      areAllFieldsComplete: false,
    });

    if (!campaign) {
      return next(
        new ErrorResponse(
          `No campaign belonging to user ${req.params.userId}`,
          404
        )
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

    // Check to see if PERK exist
    if (
      campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
        .length === 0
    ) {
      return next(
        new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
      );
    }
    // Get perk index
    const perkIndex = campaign.perks
      .map((perk) => perk._id.toString())
      .indexOf(req.params.perkId);

    // Check to see if SHIPPING exist inside perk
    if (
      campaign.perks[perkIndex].shippings.filter(
        (ship) => ship._id.toString() === req.params.shipId
      ).length === 0
    ) {
      return next(
        new ErrorResponse(
          `No SHIPPING with the id of ${req.params.shipId}`,
          404
        )
      );
    }
    // Get shipping index
    const shipIndex = campaign.perks[perkIndex].shippings
      .map((ship) => ship._id.toString())
      .indexOf(req.params.shipId);

    // Splice shipping to update array
    const updatedShipping = campaign.perks[perkIndex].shippings.splice(
      shipIndex,
      1,
      req.body
    );

    await campaign.save();

    // Get all shippings in all perks
    const shippingsInAllPerks = campaign.perks.map((perk) => {
      return { perkId: perk._id.toString(), shippings: perk.shippings || [] };
    });

    // Get all shippings in all perks
    let allShippings = campaign.perks.map((perk) => {
      return perk.shippings || [];
    });

    allShippings = [].concat.apply([], allShippings);

    res.status(200).json({
      success: true,
      message: "SHIPPING in Perks updated successfully",
      data: {
        updatedShipping,
        shippings: shippingsInAllPerks,
        allShippings,
      },
    });
  }
);

// @desc    Delete shipping in perk in temporary campaign
// @routes  DELETE /api/campaign-temp/:userId/perk/:perkId/shipping/shipId
// @access  Private [user]
exports.deleteTempCampaignPerkShipping = asyncHandler(
  async (req, res, next) => {
    let campaign;
    campaign = await CampaignTemp.findOne({
      user: req.params.userId,
      areAllFieldsComplete: false,
    });

    if (!campaign) {
      return next(
        new ErrorResponse(
          `No campaign belonging to user ${req.params.userId}`,
          404
        )
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

    // Check to see if PERK exist
    if (
      campaign.perks.filter((perk) => perk._id.toString() === req.params.perkId)
        .length === 0
    ) {
      return next(
        new ErrorResponse(`No PERK with the id of ${req.params.perkId}`, 404)
      );
    }
    // Get perk index
    const perkIndex = campaign.perks
      .map((perk) => perk._id.toString())
      .indexOf(req.params.perkId);

    // Check to see if SHIPPING exist inside perk
    if (
      campaign.perks[perkIndex].shippings.filter(
        (ship) => ship._id.toString() === req.params.shipId
      ).length === 0
    ) {
      return next(
        new ErrorResponse(
          `No SHIPPING with the id of ${req.params.shipId}`,
          404
        )
      );
    }
    // Get shipping index
    const shipIndex = campaign.perks[perkIndex].shippings
      .map((ship) => ship._id.toString())
      .indexOf(req.params.shipId);

    // Splice shipping out of array
    const deletedShipping = campaign.perks[perkIndex].shippings.splice(
      shipIndex,
      1
    );

    const newCampaign = await campaign.save();

    // Get all shippings in all perks
    let allShippings = campaign.perks.map((perk) => {
      return perk.shippings || [];
    });

    allShippings = [].concat.apply([], allShippings);

    res.status(200).json({
      success: true,
      message: "SHIPPING in Perks deleted successfully",
      data: {
        deletedShipping,
        shippings: newCampaign.perks[perkIndex].shippings,
        allShippings,
      },
    });
  }
);

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
