import * as Yup from "yup";
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  username,
  bio,
} from "./userFields";
import {
  instagram,
  linkedin,
  pinterest,
  soundcloud,
  medium,
  youtube,
  github,
  discord,
  defaultValidator,
} from "./socialFields";
import { violation } from "./globalFields";

export const RegisterValidationSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
});

export const UsernameValidationSchema = Yup.object().shape({
  username,
});

export const EmailValidationSchema = Yup.object().shape({
  email,
});

export const UpdatePasswordValidationSchema = Yup.object().shape({
  newPassword: password,
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords don't match"
  ),
});

export const UpdateProfileValidationSchema = Yup.object().shape({
  firstName,
  lastName,
  bio,
});

export const UpdateSocialsValidationSchema = Yup.object().shape({
  instagram,
  linkedin,
  pinterest,
  soundcloud,
  medium,
  youtube,
  github,
  discord,
  dribbble: defaultValidator,
  behance: defaultValidator,
  spotify: defaultValidator,
  vimeo: defaultValidator,
});

export const ReportValidationSchema = Yup.object().shape({
  violation,
  title: Yup.string()
    .min(10, "Title cannot be less than 10 or more than 255 characters")
    .max(255, "Title cannot be less than 10 or more than 255 characters"),
  body: Yup.string().max(
    1000,
    "Description cannot be more than 1000 characters"
  ),
});
