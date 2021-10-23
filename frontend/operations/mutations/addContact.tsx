import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
  mutation addContact($addContactId: String!) {
    addContact(id: $addContactId) {
      id
    }
  }
`;
