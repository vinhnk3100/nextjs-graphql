import client from "@/lib/apollo-clients";
import { AUTH_LOGIN } from "../graphql/auth/mutation";
import { LoginAuthDto, LoginAuthOutput } from "@/types/auth.type";
import { ApolloError } from "@apollo/client";

const AuthService = {
  login: async ($input: LoginAuthDto): Promise<LoginAuthOutput> => {
    try {
      const { data } = await client.mutate({
        mutation: AUTH_LOGIN,
        variables: {
          input: {
            username: $input.username,
            password: $input.password,
          },
        },
      });
      return data.loginAuth;
    } catch (error) {
        throw null;
    }
  },
};

export default AuthService;
