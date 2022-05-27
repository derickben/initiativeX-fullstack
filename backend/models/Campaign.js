const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 100,
    required: [true, "Please add a campaign title"],
  },
  photo: {
    type: String,
    // required: [true, "Please include a photo"],
  },
  desc: {
    type: String,
    required: [true, "Please provide a short description"],
  },
  category: {
    type: String,
    enum: ["education", "music", "film", "comics"],
    required: [true, "Please select a category"],
  },
  tags: [String],
  // tags: {
  //   type: [String],
  //   required: [true, "Please select tags"],
  // },
  videoLink: {
    type: String,
    match: [
      /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/,
      "Please enter a valid YouTube URL",
    ],
    required: [true, "Please enter a YouTube or Vimeo URL"],
  },
  story: {
    type: Object,
    required: [
      true,
      "Please tell potential contributors more about your campaign",
    ],
  },

  amountNeeded: {
    type: Number,
    required: [true, "Please specify the amount you intend to raise"],
  },
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  test: {
    type: Object,
    default: { question: "Hey", answer: "I love you" },
  },
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
    max: [Date.now() + 5.184e9, "Date should not be more than 60 days"], // Max of 60 days
    required: [true, "add campaign duration"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  perks: [
    {
      amount: {
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

// Static method to update isCompleted field
CampaignSchema.statics.updateToComplete = async function (campaignId) {
  console.log("In statics");
  try {
    await this.model("Campaign").findByIdAndUpdate(campaignId, {
      isCompleted: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Run cron jobs after a campaign is created
CampaignSchema.post("save", async function () {
  let duration = new Date(this.duration);
  const currentCampaingId = this._id;

  const job = new CronJob(
    "0 * * * *",
    function () {
      if (new Date() >= duration) {
        const Campaign = mongoose.model("Campaign", CampaignSchema);
        console.log("Running CRON job");
        Campaign.updateToComplete(currentCampaingId);
        job.stop();
      }
    },
    function () {
      console.log("CRON job completed successfully");
    },
    true,
    "Africa/Lagos"
  );
  job.start();
});

module.exports = mongoose.model("Campaign", CampaignSchema);
