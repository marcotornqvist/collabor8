import { gql } from "@apollo/client";

export const GET_PROFILE_DETAILS = gql`
  query profileDetails($username: String!) {
    userByUsername(username: $username) {
      id
      username
      email
      profile {
        userId
        firstName
        lastName
        bio
        country
        profileImage
        discipline {
          title
        }
      }
      socials {
        userId
        instagram
        linkedin
        dribbble
        behance
        soundcloud
        pinterest
        spotify
        medium
        youtube
        vimeo
        github
        discord
      }
    }
  }
`;
