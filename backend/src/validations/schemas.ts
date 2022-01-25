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
import { instagram } from "./socialFields";

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
});
