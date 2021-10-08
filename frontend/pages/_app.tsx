import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/app.scss";
// import client from "../utils/apollo-client";
import { useApollo } from "../utils/useApollo";
import { useState, useEffect } from "react";
import { setAccessToken } from "utils/accessToken";
import Navbar from "@components-layout/Navbar";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.BASE_URL!}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <title>Collabor8</title>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
