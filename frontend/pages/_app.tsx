import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/app.scss";
import client from "../utils/apollo-client";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <title>Collabor8</title>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
