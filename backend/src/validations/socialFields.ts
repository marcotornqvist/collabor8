import * as Yup from "yup";

// No white space
const noWhiteSpace = /^\S*$/;

export const instagram = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^[a-zA-Z0-9._]{0,28}$/, "Instagram username is not valid");

export const linkedin = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^[\w\-\_À-ÿ%]*$/, "LinkedIn Profile URL is not valid")
  .max(255, "Max 255 characters");

export const medium = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^$|^@[A-z0-9]{1,255}$/, "Medium URL is not valid")
  .max(255, "Max 255 characters");

export const youtube = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^[a-zA-Z0-9_-]*$/, "Youtube channel URL is not valid")
  .max(255, "Max 255 characters");

export const github = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^[a-z0-9]{0,38}$/, "Github username is not valid");

export const discord = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^$|^.{3,32}#[0-9]{4}$/, "Discord username is not valid");

export const defaultValidator = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(255, "is not valid");
