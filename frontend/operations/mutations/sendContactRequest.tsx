import { gql } from "@apollo/client";

export const SEND_CONTACT_REQUEST = gql`
  mutation sendContactRequest($sendContactRequestId: String!) {
    sendContactRequest(id: $sendContactRequestId) {
      status
    }
  }
`;
