import { gql } from "@apollo/client";

export const PROJECT_BY_ID = gql`
  query ProjectById($id: String!) {
    projectById(id: $id) {
      id
      title
      body
      country
      members {
        userId
        role
        assignedAt
        user {
          username
          profile {
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

export const PROJECT_MEMBER_STATUS = gql`
  query projectMemberStatus($id: String!) {
    projectMemberStatus(id: $id)
  }
`;