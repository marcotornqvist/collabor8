import { gql } from "@apollo/client";

export const BLOCK_USER = gql`
  mutation blockUser($id: String!) {
    blockUser(id: $id)
  }
`;
