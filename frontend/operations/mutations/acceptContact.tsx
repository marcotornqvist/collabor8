import { gql } from "@apollo/client";

export const ACCEPT_CONTACT = gql`
  mutation acceptContact($id: String!) {
    acceptContact(id: $id) {
      id
    }
  }
`;
