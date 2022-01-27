import { gql } from "@apollo/client";

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: String!) {
    deleteContact(id: $id)
  }
`;
