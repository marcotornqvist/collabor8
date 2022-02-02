import { gql } from "@apollo/client";

export const GET_DISCIPLINES = gql`
  query disciplines {
    disciplines {
      id
      title
      image {
        id
        small
        alt
      }
    }
  }
`;

export const GET_DISCIPLINES_LANDING = gql`
  query disciplinesLanding($data: DisciplineInput) {
    disciplines (data: $data) {
      id
      title
      image {
        small
        alt
      }
    }
  }
`;