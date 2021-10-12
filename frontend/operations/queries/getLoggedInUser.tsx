import { gql } from "@apollo/client";

export const GET_PROFILE_IMAGE = gql`
  query loggedInProfile {
    loggedInProfile {
      profileImage
    }
  }
`;
