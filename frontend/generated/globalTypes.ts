/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Sort by most recent or oldest
 */
export enum Sort {
  asc = "asc",
  desc = "desc",
}

/**
 * Login a User
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Create a new user
 */
export interface RegisterInput {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  confirmPassword: string;
}

/**
 * Filter Users
 */
export interface UsersFilterArgs {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  loggedInUserId?: string | null;
  searchText?: string | null;
  disciplines?: number[] | null;
  country?: string | null;
  sort?: Sort | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
