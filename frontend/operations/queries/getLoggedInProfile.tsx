import { gql } from "@apollo/client";

// Get details about the logged in users profile
export const GET_LOGGED_IN_PROFILE = gql`
  query loggedInProfile {
    loggedInProfile {
      userId
      firstName
      lastName
      country
      bio
      disciplineId
    }
  }
`;

// Get logged in profile image
export const GET_PROFILE_IMAGE = gql`
  query loggedInProfileImage {
    loggedInProfile {
      userId
      profileImage
    }
  }
`;
