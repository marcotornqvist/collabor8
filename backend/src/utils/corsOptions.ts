import cors from "cors";

const origins = ["http://localhost:3000", "https://studio.apollographql.com"];

export const corsOptions: cors.CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://collabor8-frontend.vercel.app"
      : origins,
  credentials: true,
};
