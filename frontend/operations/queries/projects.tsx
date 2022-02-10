import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects($data: ProjectsFilterArgs!) {
    projects(data: $data) {
      id
      title
      disciplines {
        image {
          small
          alt
          objectPosition
        }
      }
    }
  }
`;

// export const CREATE_PROJECT = gql`
//   mutation createProject($data: CreateProjectInput!) {
//     createProject(data: $data) {
//       id
//       title
//       body
//       country
//       members {
//         userId
//       }
//       disciplines {
//         title
//       }
//     }
//   }
// `;
