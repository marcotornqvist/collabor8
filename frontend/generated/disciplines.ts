/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: disciplines
// ====================================================

export interface disciplines_disciplines {
  __typename: "Discipline";
  id: number;
  title: string;
}

export interface disciplines {
  /**
   * Returns disciplines
   */
  disciplines: disciplines_disciplines[] | null;
}
