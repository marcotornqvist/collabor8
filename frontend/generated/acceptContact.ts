/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptContact
// ====================================================

export interface acceptContact_acceptContact {
  __typename: "Contact";
  id: string;
}

export interface acceptContact {
  /**
   * Accept contact request
   */
  acceptContact: acceptContact_acceptContact;
}

export interface acceptContactVariables {
  id: string;
}
