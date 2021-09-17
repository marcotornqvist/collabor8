import { useMutation, gql } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($data: Test!) {
    addTodo(data: $data) {
      text
      body
    }
  }
`;

export default function Home() {
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

  console.log(data);

  const datas = {
    body: "moi",
    text: "hej",
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({
            variables: {
              data: {
                body: "moi",
                text: "hej",
              },
            },
          });
        }}
      >
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

// import { useMutation, gql } from "@apollo/client";
// import { useEffect } from "react";

// const ADD_TODO = gql`
//   mutation AddTodo($text: String!, $body: String!) {
//     addTodo(text: $text, body: $body)
//   }
// `;

// export default function Home() {
//   const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

//   console.log(data);

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           addTodo({ variables: { text: "moisf", body: "moisf" } });
//         }}
//       >
//         <button type="submit">Add Todo</button>
//       </form>
//     </div>
//   );
// }

// import { gql, useQuery } from "@apollo/client";
// import { Sort } from "enums";

// export interface UserFilterArgs {
//   loggedInUserId?: string | null;
//   searchText?: string | null;
//   disciplines?: number[] | null;
//   country?: string | null;
//   after?: string | null;
//   before?: string | null;
//   first?: number | null;
//   last?: number | null;
//   sort?: Sort | null;
// }

// const QUERY = gql`
//   query GetUsers($usersData: UserFilterArgs!) {
//     users(data: $usersData) {
//       username
//     }
//   }
// `;

// export default function Home() {
//   const usersData = {
//     // searchText: "doe",
//     first: 1,
//   };
//   const { data, loading, error } = useQuery(QUERY, {
//     variables: {
//       usersData,
//     },
//   });

//   console.log(data);

//   return <div className="home">test</div>;
// }

// import { gql, useQuery } from "@apollo/client";

// const QUERY = gql`
//   query GetUsers($id: String!) {
//     users2(id: $id) {
//       username
//     }
//   }
// `;

// export default function Home() {
//   const { data, loading, error } = useQuery(QUERY, {
//     variables: {
//       id: "23c7dba2-1ed8-4d44-97d8-ff911655a795",
//     },
//   });

//   console.log(data);

//   return <div className="home">test</div>;
// }
