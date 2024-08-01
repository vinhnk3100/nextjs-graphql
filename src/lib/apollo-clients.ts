// lib/apollo-client.ts
import { toast } from "@/components/ui/use-toast";
import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";


const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

// const errorLink = onError(({ graphQLErrors }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, extensions }) => {
//       toast({
//         style: { top: "0 !important" },
//         variant: "destructive",
//         description: message,
//         duration: 2000
//       });
//       return {
//         message,
//         extensions
//       }
//     });
//   }
// });

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // Replace with your GraphQL endpoint
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
