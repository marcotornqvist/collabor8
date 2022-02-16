import { gql } from "@apollo/client";

export const ContactStatus = gql`
  query contactStatus($id: String!) {
    contactStatus(id: $id)
  }
`;
