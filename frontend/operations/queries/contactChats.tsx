import { gql } from "@apollo/client";

export const CONTACT_CHATS = gql`
  query contactChats($data: SearchArgs!) {
    contactChats(data: $data) {
      id
      newMessages
      user {
        profile {
          userId
          firstName
          lastName
          country
          discipline {
            title
          }
          profileImage
        }
      }
      loggedInUserReadChatAt
    }
  }
`;
