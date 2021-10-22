import { gql } from "@apollo/client";

export const CONTACT_STATUS = gql`
  query contactStatus($contactStatusId: String!) {
    contactStatus(id: $contactStatusId)
  }
`;
