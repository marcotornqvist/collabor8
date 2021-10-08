import { Response } from "express";

export const sendRefreshToken = async (res: Response, token: string) => {
  res.status(202).cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    maxAge: 1000 * 3600 * 24 * 30 * 1, // 1 month
    sameSite: "none",
    secure: true,
  });
};
