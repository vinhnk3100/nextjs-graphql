import client from "@/lib/apollo-clients";
import { GET_CURRENT_USER } from "../graphql/user/queries";
import { CurrentUserOutput } from "@/types/user.type";

const UserService = {
  getCurrentUser: async (): Promise<CurrentUserOutput> => {
    try {
      const { data } = await client.query({ query: GET_CURRENT_USER });
      return data.currentUser;
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

export default UserService;