/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StatusCode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: sendContactRequest
// ====================================================

export interface sendContactRequest_sendContactRequest {
  __typename: "Contact";
  status: StatusCode;
}

export interface sendContactRequest {
  /**
   * Add a user to contact list
   */
  sendContactRequest: sendContactRequest_sendContactRequest;
}

export interface sendContactRequestVariables {
  sendContactRequestId: string;
}
