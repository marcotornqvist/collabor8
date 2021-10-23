/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addContact
// ====================================================

export interface addContact_addContact {
  __typename: "Contact";
  id: string;
}

export interface addContact {
  /**
   * Add a user to contact list
   */
  addContact: addContact_addContact;
}

export interface addContactVariables {
  addContactId: string;
}
