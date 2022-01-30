import { gql } from "@apollo/client";

export const UPDATE_SOCIALS = gql`
  mutation updateSocials($data: SocialInput!) {
    updateSocials(data: $data) {
      instagram
      behance
      linkedin
      dribbble
      pinterest
      soundcloud
      spotify
      vimeo
      medium
      youtube
      github
      discord
    }
  }
`;