/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedInProfile
// ====================================================

export interface loggedInProfile_loggedInProfile {
  __typename: "Profile";
  profileImage: string | null;
}

export interface loggedInProfile {
  /**
   * Returns logged in user profile
   */
  loggedInProfile: loggedInProfile_loggedInProfile | null;
}