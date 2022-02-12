import { gql } from "@apollo/client";

// Get details about the logged in user
export const GET_LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
      email
      username
      profile {
        userId
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
      id
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
      id
      profile {
        userId
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
      id
      email
      username
    }
  }
`;

// Get details about the logged in user
export const GET_PROFILE_IMAGE = gql`
  query profileImage {
    loggedInUser {
      id
      profile {
        userId
        firstName
        lastName
        profileImage
      }
    }
  }
`;

// Get logged in users username
export const GET_LOGGEDIN_USERNAME = gql`
  query loggedInUsername {
    loggedInUser {
      id
      username
    }
  }
`;
