import { createHttpLink, ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
});

// Middleware to check authorization
const getToken = async () => {
  const session = await getSession();
  return session?.accessToken || "";
};

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const getAuthenticatedClient = () => {
  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: client.cache,
  });
};

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
