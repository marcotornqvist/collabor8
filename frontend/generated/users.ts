/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersFilterArgs } from "./globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users {
  __typename: "User";
  id: string;
  username: string;
  email: string;
}

export interface users {
  /**
   * Returns all users/profiles that are not disabled
   */
  users: users_users[] | null;
}

export interface usersVariables {
  usersData: UsersFilterArgs;
}
