import { gql } from "@apollo/client";

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username)
  }
`;
