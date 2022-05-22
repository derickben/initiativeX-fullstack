const express = require("express");
const dotenv = require("dotenv");
const CronJob = require("cron").CronJob;
const cookieParser = require("cookie-parser");
const path = require("path");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const { loadData } = require("./models/categoryAndTag.model");
const errorHandler = require("./middleware/error");
const cors = require("cors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const users = require("./routes/users");
const auth = require("./routes/auth");
const campaign = require("./routes/campaign");
const campaignTemp = require("./routes/campaignTemp");
const comment = require("./routes/comment");
const category = require("./routes/category");
const upload = require("./routes/upload");
const tag = require("./routes/tag");
const donate = require("./routes/donors");

const app = express();

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/campaigns", campaign);
app.use("/api/campaigns-temp", campaignTemp);
app.use("/api/comments", comment);
app.use("/api/categories", category);
app.use("/api/uploads", upload);
app.use("/api/tags", tag);
app.use("/api/donate", donate);

app.use(errorHandler);

const runCheckToKnowIfACampaignIsCompleted = async () => {
  let now = new Date();
  const Campaign = require("./models/Campaign");
  const testCron = await Campaign.find({ duration: { $lte: new Date() } });
  console.log(testCron);
  if (testCron.length > 0) {
    await Campaign.updateMany(
      { duration: { $lte: now } },
      { $set: { isCompleted: true } }
    );
  }
};

const job = new CronJob(
  "0 * * * *",
  function () {
    console.log("CRON job started successfully");
    runCheckToKnowIfACampaignIsCompleted();
  },
  null,
  true,
  "Africa/Lagos"
);
job.start();

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  await loadData();

  server = app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
