import { gql } from "@apollo/client";

// Get details about the logged in user
export const GET_LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      email
      username
      profile {
        firstName
        lastName
        bio
        profileImage
        discipline {
          id
          title
        }
        country
      }
      socials {
        instagram
        linkedin
        dribbble
        behance
        soundcloud
        pinterest
        spotify
        medium
        vimeo
        youtube
        github
        discord
      }
    }
  }
`;

// Get details about the logged in user socials
export const GET_LOGGED_IN_SOCIAL_DETAILS = gql`
  query loggedInSocialDetails {
    loggedInUser {
      socials {
        instagram
        linkedin
        dribbble
        behance
        soundcloud
        pinterest
        spotify
        medium
        vimeo
        youtube
        github
        discord
      }
    }
  }
`;

// Get details about the logged in user profile
export const GET_LOGGED_IN_PROFILE_DETAILS = gql`
  query loggedInProfileDetails {
    loggedInUser {
      profile {
        firstName
        lastName
        bio
        discipline {
          id
          title
        }
        country
      }
    }
  }
`;

// Get details about the logged in user account
export const GET_LOGGED_IN_ACCOUNT_DETAILS = gql`
  query loggedInAccountDetails {
    loggedInUser {
      email
      username
    }
  }
`;

// Get details about the logged in user
export const GET_PROFILE_IMAGE = gql`
  query profileImage {
    loggedInUser {
      profile {
        profileImage
      }
    }
  }
`;
