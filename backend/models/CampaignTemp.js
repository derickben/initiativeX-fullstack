const mongoose = require("mongoose");

const CampaignTempSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  photo: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
    enum: ["education", "music", "film", "comics"],
  },
  tags: [String],
  videoLink: {
    type: String,
  },
  story: Object,
  amountNeeded: {
    type: Number,
  },
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  endCampaign: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Date,
    min: [Date.now, "Pick a future date"],
    max: [Date.now() + 5.184e9, "Should not be more than 60 days"], // Max of 60 days
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  perks: [
    {
      amount: {
        type: Number,
      },
      title: {
        type: String,
      },
      items: [
        {
          itemName: {
            type: String,
          },
        },
      ],
      desc: {
        type: String,
      },
      image: String,
      qtyAvailable: Number,
      deliveryDate: Date,
      shipping: [
        {
          location: String,
          fee: Number,
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    immutable: true,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("CampaignTemp", CampaignTempSchema);
