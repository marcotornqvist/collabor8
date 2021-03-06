require("dotenv").config();
const path = require("path");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const BASE_URL = isDev
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_BASE_URL;
  const SUBSCRIPTION_URL = isDev
    ? "ws://localhost:4000"
    : process.env.NEXT_PUBLIC_SUBSCRIPTION_URL;

  return {
    swcMinify: true,
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
    jsconfigPaths: false,
    env: {
      BASE_URL,
      SUBSCRIPTION_URL,
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
