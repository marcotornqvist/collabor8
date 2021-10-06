import cors from "cors";

const origins = [
  // Checks if we are in production
  // process.env.NODE_ENV === "production"
  //   ? "https://collabor8-frontend.vercel.app/"
  //   : "http://localhost:3000",
  "https://collabor8-frontend.vercel.app/",
  "http://sub.localhost:3000",
  "https://studio.apollographql.com",
];

export const corsOptions: cors.CorsOptions = {
  origin: origins,
  credentials: true,
};
