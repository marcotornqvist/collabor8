import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation createProject($data: CreateProjectInput!) {
    createProject(data: $data) {
      id
      title
      body
      country
      members {
        userId
      }
      disciplines {
        title
      }
    }
  }
`;
