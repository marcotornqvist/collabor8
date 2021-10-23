import { gql } from "@apollo/client";

export const DELETE_CONTACT = gql`
  mutation deleteContact($deleteContactId: String!) {
    deleteContact(id: $deleteContactId)
  }
`;
