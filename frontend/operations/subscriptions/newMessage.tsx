import { gql } from "@apollo/client";

export const NEW_MESSAGE = gql`
  subscription newMessage($id: String!) {
    newMessage(chatId: $id) {
      body
    }
  }
`;
