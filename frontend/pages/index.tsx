import { gql, useMutation, useQuery } from "@apollo/client";
import { addTodo, addTodoVariables } from "generated/addTodo";
import Users from "@components-pages/landing/Users";
import LoggedInUser from "@components-pages/landing/LoggedInUser";

export default function Home() {
  // Follow this guide to properly use the useMutation hook with proper caching
  // https://www.apollographql.com/docs/react/data/mutations/
  // https://www.youtube.com/watch?v=4smsVPgZDOo
  return (
    <div className="landing-page">
      <div className="container">
        <LoggedInUser />
        <hr />
        <Users />
        <br />
      </div>
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
