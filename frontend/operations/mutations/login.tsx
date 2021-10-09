import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      user {
        username
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;
