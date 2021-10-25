import { gql } from "@apollo/client";

export const UNBLOCK_USER = gql`
  mutation unblockUser($unblockUserId: String!) {
    unblockUser(id: $unblockUserId)
  }
`;
