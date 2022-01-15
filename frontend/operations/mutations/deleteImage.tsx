import { gql } from "@apollo/client";

export const DELETE_IMAGE = gql`
  mutation deleteImage {
    deleteImage {
      profileImage
    }
  }
`;
