import cors from "cors";

const origins = [
  // Checks if we are in production
  // process.env.NODE_ENV === "production"
  //   ? "https://collabor8-frontend.vercel.app/"
  //   : "http://localhost:3000",
  "https://collabor8-frontend.vercel.app",
  "https://studio.apollographql.com",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://localhost:3000",
];

export const corsOptions: cors.CorsOptions = {
  origin: origins,
  credentials: true,
};
