import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    sameSite: "none",
    secure: true,
    domain: "collabor8-frontend.vercel.app",

    // secure: process.env.NODE_ENV === "production",
  });
};
