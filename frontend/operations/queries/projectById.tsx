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

export const PROJECT_FORM_VALUES = gql`
  query projectFormValues($data: ProjectById!) {
    projectById(data: $data) {
      id
      title
      body
      country
      disciplines {
        id
      }
    }
  }
`;

export const PROJECT_MEMBERS = gql`
  query projectMembers($data: ProjectById!) {
    projectById(data: $data) {
      id
      members {
        projectId
        userId
        role
        status
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

// Gets status if project is disabled or not
export const PROJECT_DISABLED_STATUS = gql`
  query projectDisabledStatus($data: ProjectById!) {
    projectById(data: $data) {
      id
      disabled
    }
  }
`;

export const ProjectMemberStatus = gql`
  query projectMemberStatus($id: String!) {
    projectMemberStatus(id: $id)
  }
`;
