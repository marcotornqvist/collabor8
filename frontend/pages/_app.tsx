import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/app.scss";
// import client from "../utils/apollo-client";
import { useApollo } from "../utils/useApollo";
import { useState, useEffect } from "react";
import Navbar from "@components-layout/Navbar/Navbar";
import { state } from "store";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  // https://www.youtube.com/watch?v=rWanEGMkXwc&t=14s
  // Follow to add typescript to valtio

  useEffect(() => {
    // Fetches the access token and sets it in valtio state management
    const fetchData = async () => {
      await fetch(`${process.env.BASE_URL!}/refresh_token`, {
        method: "POST",
        credentials: "include",
      }).then(async (x) => {
        const { accessToken } = await x.json();
        state.accessToken = accessToken;
        if (accessToken !== "") {
          state.isAuth = true;
        }
        state.loading = false;
      });
    };

    fetchData();
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
