/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: countries
// ====================================================

export interface countries_countries {
  __typename: "CountryResponse";
  key: string;
  country: string;
}

export interface countries {
  /**
   * Returns countries based on search argument
   */
  countries: countries_countries[] | null;
}
