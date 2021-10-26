/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Contact status enum
 */
export enum CONTACT_STATUS {
  ACTIVE_CONTACT = "ACTIVE_CONTACT",
  NO_CONTACT = "NO_CONTACT",
  REQUEST_RECEIVED = "REQUEST_RECEIVED",
  REQUEST_RECEIVED_FALSE = "REQUEST_RECEIVED_FALSE",
  REQUEST_SENT = "REQUEST_SENT",
}

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
  searchText?: string | null;
  disciplines?: number[] | null;
  country?: string | null;
  sort?: Sort | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
