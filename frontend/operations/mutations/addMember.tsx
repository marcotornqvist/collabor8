import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation addMember($data: MemberInput!) {
    addMember(data: $data) {
      userId
      role
      status
      projectId
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
`;
