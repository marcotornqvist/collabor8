/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile_discipline {
  __typename: "Discipline";
  id: number;
  title: string;
}

export interface updateProfile_updateProfile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  discipline: updateProfile_updateProfile_discipline | null;
  bio: string | null;
}

export interface updateProfile {
  /**
   * Update Profile
   */
  updateProfile: updateProfile_updateProfile;
}

export interface updateProfileVariables {
  data: UpdateProfileInput;
}
