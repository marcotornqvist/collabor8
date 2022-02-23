import { gql } from "@apollo/client";

export const NEW_MESSAGE = gql`
  subscription newMessage($chatId: String!) {
    newMessage(chatId: $chatId) {
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
