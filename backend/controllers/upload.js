const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// @desc    Upload a file
// @routes  POST /api/uploads
// @access  Private [user]
exports.uploadFile = asyncHandler(async (req, res, next) => {
  // Add logged in user to req.body
  req.body.user = req.user.id;

  const { key, extraPath } = req.body;

  if (!req.files) {
    return next(new ErrorResponse(`Please include a file`, 400));
  }

  const file = req.files["photo"];

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  if (
    !(
      path.extname(file.name) === ".jpg" ||
      path.extname(file.name) === ".jpeg" ||
      path.extname(file.name) === ".png"
    )
  ) {
    return next(
      new ErrorResponse(
        `Files with '${path.extname(file.name)}' extenstions are not allowed`,
        400
      )
    );
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

  file.name = uuidv4() + path.extname(file.name);

  console.log(file.name);

  const dir = `${process.env.FILE_UPLOAD_PATH}/${req.user.id}/${extraPath}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  file.mv(`${dir}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    res.status(200).json({
      success: true,
      data: `${req.user.id}/${extraPath}/${file.name}`,
    });
  });
});
