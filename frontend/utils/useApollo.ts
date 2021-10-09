import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
} from "@apollo/client";
import { useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { snapshot } from "valtio/vanilla";
import { state } from "store";

let apolloClient: ApolloClient<NormalizedCacheObject | null>;

// Refreshes access token
const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const { accessToken } = snapshot(state);

    if (!accessToken) {
      return true;
    }

    try {
      const { exp }: any = jwtDecode(accessToken);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${process.env.BASE_URL!}/refresh_token`, {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    state.accessToken = accessToken;
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const authMiddleware = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const { accessToken } = snapshot(state);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: accessToken ? `bearer ${accessToken}` : "",
            },
          }));
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const uploadLink = createUploadLink({
  uri: process.env.BASE_URL,
  credentials: "include",
  headers: {
    "keep-alive": "true",
  },
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([authMiddleware, refreshLink, uploadLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   const accessToken = getAccessToken();
//   if (accessToken) {
//     operation.setContext(({ headers = {} }) => ({
//       headers: {
//         ...headers,
//         authorization: accessToken ? `bearer ${accessToken}` : "",
//       },
//     }));
//   }
//   return forward(operation);
// });
