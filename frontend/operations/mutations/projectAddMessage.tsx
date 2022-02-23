import { gql } from "@apollo/client";

export const PROJECT_ADD_MESSAGE = gql`
  mutation projectAddMessage($data: CreateMessageInput!) {
    projectAddMessage(data: $data) {
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
