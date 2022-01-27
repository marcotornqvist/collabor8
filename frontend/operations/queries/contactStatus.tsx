import { gql } from "@apollo/client";

export const CONTACT_STATUS = gql`
  query contactStatus($id: String!) {
    contactStatus(id: $id)
  }
`;
