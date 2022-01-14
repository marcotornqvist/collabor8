/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  disciplineId: number | null;
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
