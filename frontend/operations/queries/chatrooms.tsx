import { gql } from "@apollo/client";

export const CHATROOMS = gql`
  query ($data: ProjectById!) {
    projectById(data: $data) {
      id
      title
      body
      country
      members {
        userId
        role
        user {
          id
          username
          profile {
            userId
            lastName
            firstName
            country
            profileImage
            discipline {
              title
            }
          }
        }
      }
    }
  }
`;
