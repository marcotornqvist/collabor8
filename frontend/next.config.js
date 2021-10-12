require("dotenv").config();
const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const BASE_URL = isDev
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_BASE_URL;

  return {
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
    env: {
      BASE_URL: BASE_URL,
    },
    plugins: [
      "postcss-flexbugs-fixes",
      [
        "postcss-preset-env",
        {
          autoprefixer: {
            flexbox: "no-2009",
            grid: "autoplace",
          },
          stage: 3,
          features: {
            "custom-properties": false,
          },
        },
      ],
    ],
  };
};
