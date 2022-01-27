import { gql } from "@apollo/client";

export const REJECT_CONTACT = gql`
  mutation rejectContact($id: String!) {
    rejectContact(id: $id)
  }
`;
