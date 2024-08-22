import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession, signOut } from "next-auth/react";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
});

// Middleware to check authorization
const getToken = async () => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  const currentTimestamp = Date.now();
  const EXPIRATION_TIMESTAMP = new Date(session?.expires || "").getTime();

  if (currentTimestamp > EXPIRATION_TIMESTAMP) {
    return null;
  } else {
    return accessToken;
  }
};

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (error) {
    console.error("Error getting token:", error);
    return { headers };
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (message === "Unauthorized") {
        signOut({
          redirect: false,
          callbackUrl: "/login", // Redirect URL after sign-out
        });
        return;
      }
      return;
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
