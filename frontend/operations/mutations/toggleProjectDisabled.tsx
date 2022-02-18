import { gql } from "@apollo/client";

export const TOGGLE_PROJECT_DISABLED = gql`
  mutation toggleProjectDisabled($projectId: String!) {
    toggleProjectDisabled(projectId: $projectId)
  }
`;


