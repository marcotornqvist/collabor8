import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  operationName,
} from "@apollo/client";
import { useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";
import { getAccessToken } from "./accessToken";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:5000",
  headers: {
    "keep-alive": "true",
  },
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: uploadLink,
    cache: new InMemoryCache(),
    credentials: "include",
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
