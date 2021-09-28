import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "http://localhost:5000", // Apollo Server is served from port 5000
  headers: {
    "keep-alive": "true",
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_BASE_URL,
  cache: new InMemoryCache(),
  link: uploadLink,
});

export default client;
