/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedInProfileImage
// ====================================================

export interface loggedInProfileImage_loggedInProfile {
  __typename: "Profile";
  userId: string;
  profileImage: string | null;
}

export interface loggedInProfileImage {
  /**
   * Returns logged in user profile
   */
  loggedInProfile: loggedInProfileImage_loggedInProfile | null;
}
