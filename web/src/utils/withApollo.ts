import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";

// Apollo Client Setup
// Required for SSR

const apollo = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache,
    credentials: "include"
});

export const withApollo = createWithApollo(apollo)