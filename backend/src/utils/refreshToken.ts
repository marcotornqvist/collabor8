import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./auth";
import { prisma } from "./context";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};

export const sendRefreshToken = async (res: Response, token: string) => {
  res.status(202).cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    maxAge: 1000 * 3600 * 24 * 30 * 1, // 1 month
    sameSite: "none",
    secure: true,
  });
};

export const deleteRefreshToken = async (res: Response) => {
  res.status(202).cookie("jid", "", {
    httpOnly: true,
    path: "/refresh_token",
    maxAge: 1000, // 1 month
    sameSite: "none",
    secure: true,
  });
};
