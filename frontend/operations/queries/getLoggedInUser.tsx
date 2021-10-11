import { gql } from "@apollo/client";

export const GET_LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
      username
      email
      profile {
        firstName
        lastName
        country
        bio
        discipline {
          title
        }
        profileImage
      }
    }
  }
`;
