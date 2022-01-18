
import { gql } from "@apollo/client";

export const GET_DISCIPLINES = gql`
  query disciplines {
    disciplines {
      id
      title
    }
  }
`;
