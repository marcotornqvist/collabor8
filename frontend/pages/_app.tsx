import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/useApollo";
import { authState } from "store";
import PrivateRoute from "../utils/privateRoute";
import Navbar from "@components-layout/navbar/Navbar";
import Footer from "@components-layout/footer/Footer";
import Menu from "@components-layout/menu/Menu";
import "../styles/app.scss";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Fetches the access token and sets it in valtio state management
    const fetchData = async () => {
      await fetch(`${process.env.BASE_URL!}/refresh_token`, {
        method: "POST",
        credentials: "include",
      }).then(async (x) => {
        const { accessToken } = await x.json();
        authState.accessToken = accessToken;
        if (accessToken !== "") {
          authState.isAuth = true;
        }
        authState.loading = false;
      });
    };

    fetchData();
  }, []);

  // These routes are only accessible when authenticated
  const protectedRoutes = ["/my-profile", "/chat", "/settings"];

  return (
    <ApolloProvider client={client}>
      <title>Collabor8</title>
      <Navbar />
      <Menu />
      <div className="main">
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Component {...pageProps} />
        </PrivateRoute>
      </div>
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp;
