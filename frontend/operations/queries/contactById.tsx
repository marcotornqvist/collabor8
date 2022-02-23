import { gql } from "@apollo/client";

export const CONTACT_BY_ID = gql`
  query contactById($id: String!) {
    contactById(id: $id) {
      username
      profile {
        userId
        firstName
        lastName
        country
        profileImage
        discipline {
          title
        }
      }
    }
  }
`;
