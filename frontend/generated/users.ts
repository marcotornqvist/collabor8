/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersFilterArgs } from "./globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_profile_discipline {
  __typename: "Discipline";
  title: string;
}

export interface users_users_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  country: string | null;
  discipline: users_users_profile_discipline | null;
}

export interface users_users {
  __typename: "User";
  id: string;
  username: string;
  profile: users_users_profile | null;
}

export interface users {
  /**
   * Returns all users/profiles except logged in user (if authenticated)
   */
  users: users_users[] | null;
}

export interface usersVariables {
  data: UsersFilterArgs;
}
