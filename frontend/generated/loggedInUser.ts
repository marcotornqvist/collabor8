/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedInUser
// ====================================================

export interface loggedInUser_loggedInUser {
  __typename: "User";
  id: string;
  email: string;
}

export interface loggedInUser {
  /**
   * Returns the "user" data for the user that is currently logged in 
   */
  loggedInUser: loggedInUser_loggedInUser;
}
