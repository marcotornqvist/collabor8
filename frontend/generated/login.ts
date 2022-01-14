/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
}

export interface login_login_user {
  __typename: "User";
  username: string;
  profile: login_login_user_profile | null;
}

export interface login_login {
  __typename: "AuthResponse";
  accessToken: string;
  user: login_login_user;
}

export interface login {
  /**
   * Login to an account
   */
  login: login_login;
}

export interface loginVariables {
  data: LoginInput;
}
