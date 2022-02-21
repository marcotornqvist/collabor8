import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects($data: ProjectsFilterArgs!) {
    projects(data: $data) {
      id
      title
      disciplines {
        image {
          id
          small
          alt
          objectPosition
        }
      }
    }
  }
`;

export const GET_PROJECTS_BY_USERNAME = gql`
  query projectsByUsername($data: PaginationUserArgs!) {
    projectsByUsername(data: $data) {
      id
      title
      disciplines {
        image {
          id
          small
          alt
          objectPosition
        }
      }
    }
  }
`;
