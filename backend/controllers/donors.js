const Donor = require("../models/Donor");
const Campaign = require("../models/Campaign");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const paystack = require("paystack")(process.env.PAYSTACK_PRIVATE_KEY);

// @desc    Donate to a campaign
// @routes  POST /api/donate/:campaignId
// @access  Public
exports.initiatePayment = asyncHandler(async (req, res, next) => {
  // Make sure a campaign exist
  const campaign = await Campaign.findById(req.params.campaignId);

  if (!campaign) {
    return next(
      new ErrorResponse(
        `Campaign with id ${req.params.campaignId} does not exist`,
        400
      )
    );
  }
  let { email, amount } = req.body;
  amount = amount * 100;

  const options = {
    key: process.env.PAYSTACK_PRIVATE_KEY,
    amount,
    email,
  };

  const payment = await paystack.transaction.initialize(options);
  if (payment.status !== false) {
    const reference = payment.data?.reference;

    const ref = await Donor.create({ reference, campaign: campaign._id });

    res.status(200).json({
      success: true,
      data: payment.data,
    });
  } else {
    return next(new ErrorResponse(payment.message, 400));
  }
});

// @desc    Verify a campaign donation
// @routes  GET /api/donate/:campaignId/:ref
// @access  Public
exports.verifyPayment = asyncHandler(async (req, res, next) => {
  const successful = await paystack.transaction.verify(req.params.ref);
  const email = successful.data.customer.email;
  const amount = successful.data.amount / 100;
  const reference = successful.data.reference;

  if (successful.status) {
    if (successful.data.status === "failed") {
      await Donor.findOneAndDelete({ reference });
      return next(new ErrorResponse(`Transaction failed`, 404));
    }

    if (successful.data.status === "success") {
      const donor = await Donor.findOneAndUpdate(
        { reference },
        { email, amount, isSuccessful: true },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: donor,
      });
    } else {
      return next(new ErrorResponse(`Transaction Incomplete`, 400));
    }
  } else {
    return next(new ErrorResponse(successful, 400));
  }
});
