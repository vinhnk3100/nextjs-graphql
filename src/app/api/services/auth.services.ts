import client from "@/lib/apollo-clients";
import { AUTH_LOGIN } from "../graphql/auth/mutation";
import { LoginAuthDto, LoginAuthOutput } from "@/types/auth.type";

interface ErrorResponse {
  message: string;
  status?: string;
  statusCode?: number;
}

const AuthService = {
  login: async (
    $input: LoginAuthDto
  ): Promise<LoginAuthOutput | ErrorResponse> => {
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
    } catch (error: any) {
      let extensions: { status?: string; statusCode?: number } = {};
      if (error.graphQLErrors || error.networkError) {
        let errorMessage = "An unknown error occurred";

        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message, extensions: ext }: any) => {
            errorMessage = message;
            extensions = ext;
          });
        }

        if (error.networkError) {
          errorMessage = error.networkError.message;
        }

        return {
          message: errorMessage,
          status: extensions.status,
          statusCode: extensions.statusCode,
        };
      }
      throw null;
    }
  },
};

export default AuthService;
