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
    match: [
      /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/,
      "Please enter a valid YouTube URL",
    ],
  },
  story: Object,
  amountNeeded: {
    type: Number,
    min: [500000, "You cannot raise lower than 500,000 Naira"],
    default: 500000,
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
  hasCampaignEnded: {
    type: Boolean,
    default: false,
  },
  areAllFieldsComplete: {
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
      visibility: {
        type: Boolean,
        default: true,
      },
      price: {
        type: Number,
        required: [true, "Enter an amount"],
      },
      title: {
        type: String,
        required: [true, "Enter a perk title"],
      },
      items: [
        {
          itemName: {
            type: String,
            required: [true, "Enter the name of the item"],
          },
        },
      ],
      desc: {
        type: String,
        required: [true, "Enter a description for your perk"],
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
      shippings: [
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
  backers: [
    {
      name: {
        type: String,
        required: [true, "Enter your full name"],
      },
      email: {
        type: String,
        required: [true, "Enter your email"],
        match: [
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please add a valid email",
        ],
      },
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
