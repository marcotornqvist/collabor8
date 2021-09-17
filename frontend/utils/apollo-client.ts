import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_BASE_URL,
  link: createUploadLink({
    uri: "http://localhost:5000",
  }),
  cache: new InMemoryCache(),
});

export default client;
