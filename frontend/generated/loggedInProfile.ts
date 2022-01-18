/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedInProfile
// ====================================================

export interface loggedInProfile_loggedInProfile_discipline {
  __typename: "Discipline";
  title: string;
  id: number;
}

export interface loggedInProfile_loggedInProfile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  bio: string | null;
  discipline: loggedInProfile_loggedInProfile_discipline | null;
}

export interface loggedInProfile {
  /**
   * Returns logged in user profile
   */
  loggedInProfile: loggedInProfile_loggedInProfile | null;
}
