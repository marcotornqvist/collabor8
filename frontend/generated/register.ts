/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: register
// ====================================================

export interface register_register_user_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
}

export interface register_register_user {
  __typename: "User";
  username: string;
  profile: register_register_user_profile | null;
}

export interface register_register {
  __typename: "AuthResponse";
  accessToken: string;
  user: register_register_user;
}

export interface register {
  /**
   * Creates a new User
   */
  register: register_register;
}

export interface registerVariables {
  data: RegisterInput;
}
