import { gql } from "@apollo/client";

export const ACCEPT_INVITE = gql`
  mutation acceptInvite($id: String!) {
    acceptInvite(projectId: $id)
  }
`;
