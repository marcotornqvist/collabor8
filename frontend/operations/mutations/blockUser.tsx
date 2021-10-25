import { gql } from "@apollo/client";

export const BLOCK_USER = gql`
  mutation blockUser($blockUserId: String!) {
    blockUser(id: $blockUserId)
  }
`;
