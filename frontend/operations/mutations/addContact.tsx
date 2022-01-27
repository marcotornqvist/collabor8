import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
  mutation addContact($id: String!) {
    addContact(id: $id) {
      id
    }
  }
`;
