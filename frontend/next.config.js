require("dotenv").config();
const path = require("path");

module.exports = {
  images: {
    domains: ["collabor8-image-bucket.s3.eu-west-1.amazonaws.com"],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
