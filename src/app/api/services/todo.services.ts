import client from "@/lib/apollo-clients";
import { GET_TODOS } from "../graphql/todo/queries";
import { Todo } from "@/types/todos.type";

const TodoService = {
  getMany: async (): Promise<Todo[]> => {
    try {
      const { data } = await client.query({ query: GET_TODOS });
      return data.todos;
    } catch (error) {
      throw error;
    }
  },
};

export default TodoService;