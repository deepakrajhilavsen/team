const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const S3Client = require("../config/aws.config");
const CustomError = require("../Utils/customError");
const { INVALID_FORMAT } = require("../Utils/constants");

const fileType = (file) => {
  const imageTypes = [".png", ".jpg", ".jpeg"];
  const docTypes = ["pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (imageTypes.includes(ext)) {
    return "image";
  }
  if (docTypes.includes(ext)) {
    return "resume";
  }
  return null;
};

const s3Storage = multerS3({
  s3: S3Client,
  bucket: process.env.S3_BUCKET_NAME,
  acl: "public-read",
  metadata: (req, file, callback) => {
    callback(null, { fieldname: file.fieldname });
  },
  key: (req, file, callback) => {
    const dir = fileType(file);
    if (!dir) {
      return callback(
        new CustomError(INVALID_FORMAT.message, INVALID_FORMAT.status)
      );
    }
    const fileName = `${dir}/${Date.now().toString()}-${file.originalname}`;
    callback(null, fileName);
  },
});

const upload = multer({
  storage: s3Storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
});

module.exports = upload;
