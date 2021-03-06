import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Stream } from "stream";
import stream from "stream";

export interface Prisma {
  prisma: PrismaClient;
}

export interface Context extends Prisma {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export interface FormErrors {
  [key: string]: string | undefined;
}

// Same as FormErrors but can be any value
export interface IFields {
  [key: string]: any;
}

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};
