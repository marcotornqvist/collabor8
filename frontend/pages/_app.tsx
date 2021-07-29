import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo-client";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
