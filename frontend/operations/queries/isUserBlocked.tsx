import { gql } from "@apollo/client";

export const IS_USER_BLOCKED = gql`
  query isUserBlocked($isUserBlockedId: String!) {
    isUserBlocked(id: $isUserBlockedId)
  }
`;
