import * as Yup from "yup";

export const lastName = Yup.string().max(
  255,
  "Last name cannot be more than 255 characters"
);

export const firstName = Yup.string().max(
  255,
  "First name cannot be more than 255 characters"
);

export const bio = Yup.string().max(
  500,
  "Bio cannot be more than 500 characters"
);

export const email = Yup.string()
  .email("Email is not valid")
  .required("Email cannot be empty");

export const password = Yup.string().min(
  6,
  "Password must be at least 6 characters"
);

export const confirmPassword = Yup.string().oneOf(
  [Yup.ref("password"), null],
  "Passwords don't match"
);

const message =
  "Username cannot be less than 3 characters or more than 50 characters and can only contain letters(a-z) and numbers";

export const username = Yup.string()
  .min(3, message)
  .max(50, message)
  .matches(/[a-z0-9]/, message)
  .required(message);
