/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMessageInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: contactAddMessage
// ====================================================

export interface contactAddMessage_contactAddMessage {
  __typename: "Message";
  body: string;
}

export interface contactAddMessage {
  /**
   * Add Message to contact by contact id
   */
  contactAddMessage: contactAddMessage_contactAddMessage;
}

export interface contactAddMessageVariables {
  data: CreateMessageInput;
}
