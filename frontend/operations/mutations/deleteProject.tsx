import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id)
  }
`;
