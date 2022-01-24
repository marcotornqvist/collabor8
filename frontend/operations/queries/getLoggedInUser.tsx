import { gql } from "@apollo/client";

// Get details about the logged in user
export const GET_LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      username
      email
    }
  }
`;
