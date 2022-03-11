import { gql } from "@apollo/client";

export const PROJECT_CHATS = gql`
  query projectChats($data: SearchArgs!) {
    projectChats(data: $data) {
      id
      title
      newMessages
    }
  }
`;

export const PROJECT_TITLE = gql`
  query projectTitle($data: ProjectById!) {
    projectById(data: $data) {
      id
      title
    }
  }
`;

export const PROJECT_MESSAGES = gql`
  query projectMessages($data: ChatInput!) {
    projectMessages(data: $data) {
      messages {
        id
        body
        user {
          id
          username
          profile {
            userId
            firstName
            lastName
            profileImage
          }
        }
      }
      hasMore
    }
  }
`;
