import { gql } from "@apollo/client";

export const UNBLOCK_USER = gql`
  mutation unblockUser($id: String!) {
    unblockUser(id: $id)
  }
`;
