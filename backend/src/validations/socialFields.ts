import * as Yup from "yup";

const instagramMessage =
  "Max 30 characters and only letters(a-z), numbers, periods, and underscores";

export const instagram = Yup.string()
  .max(30, instagramMessage)
  .matches(/[a-z0-9._]/, instagramMessage);

const linkedinMessage =
  "Max 30 characters and only letters(a-z), numbers, periods, and underscores";

export const linkedin = Yup.string()
  .max(128, linkedinMessage)
  .matches(/[a-z0-9._]/, linkedinMessage);

const pinterestMessage =
  "Max 30 characters and only letters(a-z), numbers, periods, and underscores";

export const pinterest = Yup.string()
  .max(30, pinterestMessage)
  .matches(/[a-z0-9._]/, pinterestMessage);
