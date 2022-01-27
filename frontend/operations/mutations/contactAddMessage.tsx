import { gql } from "@apollo/client";

export const CONTACT_ADD_MESSAGE = gql`
  mutation contactAddMessage($data: CreateMessageInput!) {
    contactAddMessage(data: $data) {
      body
    }
  }
`;
