/* eslint-disable react-hooks/rules-of-hooks */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "./lib/apollo-clients";
import { AUTH_GOOGLE_LOGIN, AUTH_LOGIN } from "./app/api/graphql/auth/mutation";
import { error } from "console";

type SessionResponse = {
  accessToken: string | unknown;
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) return null;
        try {
          const { data } = await client.mutate({
            mutation: AUTH_LOGIN,
            variables: {
              input: {
                username: credentials.username,
                password: credentials.password,
              },
            },
          });
          console.log("Data login: ", data);
          if (data?.loginAuth) {
            if (data.loginAuth.status === false) {
              // If the login was unsuccessful, throw an error
              throw new Error(
                data.loginAuth.message || "Authentication failed"
              );
            }
            return {
              id: credentials.username, // or any unique identifier
              name: data.loginAuth.__typename,
              accessToken: data.loginAuth.accessToken,
            };
          }
          throw new Error("Invalid response from server");
        } catch (error: any) {
          let errorMessage = "An unknown error occurred";
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach(({ message }: any) => {
              errorMessage = message;
            });
          } else if (error.networkError) {
            errorMessage = error.networkError.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          // Throw the error instead of returning it
          throw new Error(errorMessage);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET_KEY,
  callbacks: {
    async signIn({ user, account, credentials }): Promise<any> {
      if (account?.provider === "google") {
        try {
          const { data } = await client.mutate({
            mutation: AUTH_GOOGLE_LOGIN,
            variables: {
              input: {
                idToken: account.id_token,
              },
            },
          });
          if (data.loginGoogleAuth.status) {
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error during Google login:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as SessionResponse).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
