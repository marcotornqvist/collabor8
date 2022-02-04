import { useEffect, ReactNode } from "react";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/useApollo";
import { authState } from "store";
import { useRouter } from "next/router";
import PrivateRoute from "../utils/privateRoute";
import Navbar from "@/components-layout/navbar/Navbar";
import Footer from "@/components-layout/footer/Footer";
import Menu from "@/components-layout/menu/Menu";
import Toasts from "@/components-modules/global/toasts/Toasts";
import "../styles/app.scss";

// <script src="https://kit.fontawesome.com/0f6f932cce.js" crossorigin="anonymous"></script>

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
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

  // For per-page layouts
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  // These routes are only accessible when authenticated
  const protectedRoutes = ["/my-profile", "/chat", "/settings", "/report"];

  // Check if navbar and footer should be loaded
  const { pathname } = useRouter();

  // Checks if pathname matches with one of the items in the array below.
  const paths = ["/register", "/login"];
  const isPage = paths.includes(pathname);

  return (
    <ApolloProvider client={client}>
      <title>Collabor8</title>
      <Navbar hide={isPage} />
      <Menu />
      <div className={`main${isPage ? " main-remove" : ""}`}>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          {getLayout(<Component {...pageProps} />)}
        </PrivateRoute>
      </div>
      <Toasts />
      {!isPage && <Footer />}
    </ApolloProvider>
  );
};

export default MyApp;
