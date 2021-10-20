import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users($usersData: UsersFilterArgs!) {
    users(data: $usersData) {
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
