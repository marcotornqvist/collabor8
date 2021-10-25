import { gql } from "@apollo/client";

export const REJECT_CONTACT = gql`
  mutation rejectContact($rejectContactId: String!) {
    rejectContact(id: $rejectContactId)
  }
`;
