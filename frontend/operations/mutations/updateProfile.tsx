import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateProfile($data: UpdateProfileInput!) {
    updateProfile(data: $data) {
      firstName
      lastName
      country
      # disciplineId
      discipline {
        id
        title
      }
      bio
    }
  }
`;
