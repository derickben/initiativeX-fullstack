const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
      required: [true, "Reference not found, please make sure to include one"],
    },
    isSuccessful: {
      type: Boolean,
      default: false,
    },
    campaign: {
      type: mongoose.Schema.ObjectId,
      immutable: true,
      ref: "Campaign",
      required: [true, "Provided a campaign to receive donation"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", DonorSchema);
