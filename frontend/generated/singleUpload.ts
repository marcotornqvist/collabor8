/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: singleUpload
// ====================================================

export interface singleUpload_singleUpload {
  __typename: "UploadedFileResponse";
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
}

export interface singleUpload {
  /**
   * Update Profile Image
   */
  singleUpload: singleUpload_singleUpload;
}

export interface singleUploadVariables {
  file: any;
}
