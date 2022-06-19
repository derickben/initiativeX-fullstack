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
  faqs: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
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
      price: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      items: [
        {
          itemName: {
            type: String,
            required: true,
          },
        },
      ],
      desc: {
        type: String,
        required: true,
      },
      image: String,
      qtyAvailable: {
        type: Number,
        required: true,
      },
      deliveryDate: {
        type: Date,
        required: true,
      },
      shipping: [
        {
          location: {
            type: String,
            required: true,
          },
          fee: {
            type: Number,
            required: true,
          },
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
