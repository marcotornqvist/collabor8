/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedInUser
// ====================================================

export interface loggedInUser_loggedInUser_profile_discipline {
  __typename: "Discipline";
  title: string;
}

export interface loggedInUser_loggedInUser_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  bio: string | null;
  discipline: loggedInUser_loggedInUser_profile_discipline | null;
  profileImage: string | null;
}

export interface loggedInUser_loggedInUser {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  profile: loggedInUser_loggedInUser_profile | null;
}

export interface loggedInUser {
  /**
   * Returns the "user" data for the user that is currently logged in 
   */
  loggedInUser: loggedInUser_loggedInUser;
}
