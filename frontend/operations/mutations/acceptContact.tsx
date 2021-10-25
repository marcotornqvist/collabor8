import { gql } from "@apollo/client";

export const ACCEPT_CONTACT = gql`
  mutation acceptContact($acceptContactId: String!) {
    acceptContact(id: $acceptContactId) {
      id
    }
  }
`;
