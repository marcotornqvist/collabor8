import { gql } from "@apollo/client";

export const IS_USER_BLOCKED = gql`
  query isUserBlocked($id: String!) {
    isUserBlocked(id: $id)
  }
`;
