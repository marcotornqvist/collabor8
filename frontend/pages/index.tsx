import { gql, useMutation, useQuery } from "@apollo/client";
import { addTodo, addTodoVariables } from "generated/addTodo";
import Users from "@components-pages/landing/Users";
import LoggedInUser from "@components-pages/landing/LoggedInUser";
import CookieTest from "@components-pages/landing/CookieTest";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="container">
        <LoggedInUser />
        <Users />
        <br />
        <CookieTest />
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
