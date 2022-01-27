import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users($data: UsersFilterArgs!) {
    users(data: $data) {
      id
      username
      profile {
        firstName
        lastName
        profileImage
        country
        discipline {
          title
        }
      }
    }
  }
`;
