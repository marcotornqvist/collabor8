import * as Yup from "yup";

// Messages
const instagramMessage =
  "Max 30 characters, lowercase letters(a-z), numbers, periods and underscores are allowed";
const defaultLengthMessage = "Max 255 characters";
const notValidMessage = "Username is not valid";

// Regex
const noWhiteSpace = /^\S*$/;

export const instagram = Yup.string()
  .matches(/^[a-z0-9._]*$/, instagramMessage)
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(30, instagramMessage);

export const linkedin = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .matches(/^[\w\-\_À-ÿ%]*$/, notValidMessage)
  .max(255, defaultLengthMessage);

const pinterestMessage =
  "Max 30 characters, letters(A-z), numbers and underscores are allowed";

export const pinterest = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(30, pinterestMessage)
  .matches(/^[A-z0-9_]*$/, pinterestMessage);

const soundcloudMessage =
  "Max 255 characters, lowercase letters(A-z), numbers, underscores and dashes are allowed";

export const soundcloud = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(255, soundcloudMessage)
  .matches(/^[a-z0-9_-]*$/, soundcloudMessage);

const mediumMessage =
  "Max 255 characters, letters(A-z) and numbers are allowed";

export const medium = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(255, mediumMessage)
  .matches(/^[A-z0-9]*$/, mediumMessage);

const youtubeMessage =
  "Max 255 characters, letters(A-z), numbers, underscores, dashes and backslashes are allowed";

export const youtube = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(255, youtubeMessage)
  .matches(/^[A-z0-9-\_]*$/, youtubeMessage);

const githubMessage =
  "Max 39 characters, letters(A-z), numbers, underscores, dashes and backslashes are allowed";

export const github = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(39, githubMessage)
  .matches(/^[A-z0-9_-]*$/, githubMessage);

const discordMessage =
  "Max 255 characters, letters(A-z), numbers, underscores, dashes and backslashes are allowed";

export const discord = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(255, discordMessage)
  .matches(/^[A-z0-9-\_]*$/, discordMessage);

export const defaultValidator = Yup.string()
  .matches(noWhiteSpace, "No whitespace allowed")
  .max(255, defaultLengthMessage);
