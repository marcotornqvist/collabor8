import { gql } from "@apollo/client";

export const PROJECT_CHATS = gql`
  query projectChats($data: SearchArgs!) {
    projectChats(data: $data) {
      id
      title
      newMessages
      latestMessageDate
      members {
        readChatAt
      }
    }
  }
`;
