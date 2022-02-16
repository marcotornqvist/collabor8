import { gql } from "@apollo/client";

export const PROJECT_BY_ID = gql`
  query projectById($data: ProjectById!) {
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

export const EDIT_PROJECT_BY_ID = gql`
  query editProjectById($data: ProjectById!) {
    projectById(data: $data) {
      id
      title
      body
      country
      disciplines {
        id
      }
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

export const PROJECT_MEMBER_STATUS = gql`
  query projectMemberStatus($id: String!) {
    projectMemberStatus(id: $id)
  }
`;
