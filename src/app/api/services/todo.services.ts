import client from "@/lib/apollo-clients";
import { GET_TODOS } from "../graphql/todo/queries";
import { Todo } from "@/types/todos.type";

interface ErrorResponse {
  message: string;
  status?: string;
  statusCode?: number;
}

const TodoService = {
  getMany: async (): Promise<Todo[] | ErrorResponse> => {
    try {
      const { data } = await client.query({ query: GET_TODOS });
      return data.todos;
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

export default TodoService;