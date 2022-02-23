import { gql } from "@apollo/client";

export const CONTACT_ADD_MESSAGE = gql`
  mutation contactAddMessage($data: CreateMessageInput!) {
    contactAddMessage(data: $data) {
      id
      body
      user {
        username
        profile {
          userId
          fullName
          profileImage
        }
      }
      createdAt
    }
  }
`;
