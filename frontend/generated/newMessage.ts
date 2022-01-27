/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: newMessage
// ====================================================

export interface newMessage_newMessage {
  __typename: "MessageSubscribtionResponse";
  body: string;
}

export interface newMessage {
  newMessage: newMessage_newMessage;
}

export interface newMessageVariables {
  id: string;
}
