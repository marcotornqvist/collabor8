/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CONTACT_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: contactStatus
// ====================================================

export interface contactStatus {
  /**
   * Return the status for a contact request between loggedInUser and userId
   */
  contactStatus: CONTACT_STATUS;
}

export interface contactStatusVariables {
  id: string;
}
