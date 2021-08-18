import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export interface Prisma {
  prisma: PrismaClient;
}

export interface Context extends Prisma {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export interface LooseObject {
  [key: string]: string | null | undefined;
}
