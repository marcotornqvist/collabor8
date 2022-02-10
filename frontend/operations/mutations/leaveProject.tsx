import { gql } from "@apollo/client";

export const LEAVE_PROJECT = gql`
  mutation leaveProject($id: String!) {
    leaveProject(id: $id)
  }
`;
