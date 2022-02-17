import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  split,
} from "@apollo/client";
import { useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { snapshot } from "valtio/vanilla";
import { authState } from "store";
import { Subscription } from "zen-observable-ts";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition, concatPagination } from "@apollo/client/utilities";

let apolloClient: ApolloClient<NormalizedCacheObject | null>;

// Refreshes access token
const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const { accessToken } = snapshot(authState);

    if (!accessToken) {
      return true;
    }

    try {
      const { exp }: JwtPayload = jwtDecode(accessToken);
      if (Date.now() >= (exp || 0) * 1000) {
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
    authState.accessToken = accessToken;
    if (accessToken !== "") {
      authState.isAuth = true;
    }
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const authMiddleware = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: Subscription;
      Promise.resolve(operation)
        .then((operation) => {
          const { accessToken } = snapshot(authState);
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

// Create a WebSocket link:
const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.env.SUBSCRIPTION_URL!,
      options: {
        reconnect: true,
        connectionParams: () => {
          const { accessToken } = snapshot(authState);

          return {
            authorization: accessToken ? `bearer ${accessToken}` : "",
          };
        },
      },
    })
  : null;

// only create the split in the browser
const splitLink = wsLink
  ? split(
      // split based on operation type
      ({ query }) => {
        let definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      uploadLink
    )
  : uploadLink;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([authMiddleware, refreshLink, splitLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Profile: {
          // object unique identifier is parent(User) id
          keyFields: ["userId"],
        },
        Disciplines: {
          // object unique identifier is parent(Project) id
          keyFields: ["projectId"],
        },
        Members: {
          // object unique identifier is parent(Project) id
          keyFields: ["projectId"],
        },
        Query: {
          fields: {
            loggedInUser: {
              merge: true,
            },
            projectById: {
              merge: true,
            },
            users: concatPagination(),
            projects: concatPagination(),
          },
        },
      },
    }),
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

export function useApollo(
  initialState: any
): ApolloClient<NormalizedCacheObject | null> {
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
