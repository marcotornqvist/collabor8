import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/app.scss";
// import client from "../utils/apollo-client";
import { useApollo } from "../utils/useApollo";
import Link from "next/link";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <title>Collabor8</title>
      <nav className="navbar">
        <div className="container">
          <ul style={{ display: "flex", marginBottom: "16px" }}>
            <li style={{ marginRight: "16px" }}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li style={{ marginRight: "16px" }}>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
            <li style={{ marginRight: "16px" }}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
