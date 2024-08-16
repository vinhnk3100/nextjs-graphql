import client from "@/lib/apollo-clients";
import { AUTH_LOGIN, AUTH_REGISTER } from "../graphql/auth/mutation";
import { LoginAuthDto, LoginAuthOutput, LogoutOutput, RegisterAuthDto, RegisterOutput } from "@/types/auth.type";
import { AUTH_LOGOUT } from "../graphql/auth/query";

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
          status: (extensions as any).status,
          statusCode: (extensions as any).statusCode,
        };
      }
      throw null;
    }
  },
  logout: async (): Promise<LogoutOutput> => {
    try {
      const { data } = await client.query({ query: AUTH_LOGOUT });
      return data.logout;
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
          status: (extensions as any).status,
          statusCode: (extensions as any).statusCode,
        };
      }
      throw null;
    }
  },
  register: async ($input: RegisterAuthDto): Promise<RegisterOutput> => {
    try {
      const { data } = await client.mutate({
        mutation: AUTH_REGISTER,
        variables: {
          input: {
            username: $input.username,
            password: $input.password,
            email: $input.email,
          },
        },
      });
      return data.registerAuth;
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
          status: (extensions as any).status,
          statusCode: (extensions as any).statusCode,
        };
      }
      throw null;
    }
  },
};

export default AuthService;
