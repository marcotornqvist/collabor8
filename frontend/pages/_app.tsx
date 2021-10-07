import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/app.scss";
// import client from "../utils/apollo-client";
import { useApollo } from "../utils/useApollo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { setAccessToken } from "utils/accessToken";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}refresh_token`
        : "http://localhost:5000/refresh_token",
      {
        method: "POST",
        credentials: "include",
      }
    ).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

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
