import cors from "cors";

const allowedOrigins = [
  "http://localhost:4000",
  "https://studio.apollographql.com",
];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
