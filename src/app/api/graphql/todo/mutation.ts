import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
mutation updateTodo($id: Int!, $input: UpdateTodoDto!) {
  updateTodo(id: $id, updateTodoDto: $input) {
    status
    message
    data {
      id
      title
      content
      priority
      dateStart
      dateEnd
      status
      username
      userId
    }
  }
}
`;

export const CREATE_TODO = gql`
mutation createTodo($input: CreateTodoDto!) {
  createTodo(createTodoDto: $input) {
    status
    message
    data {
      id
      title
      content
      priority
      dateStart
      dateEnd
      status
      username
      userId
    }
  }
}`;

export const DELETE_TODO = gql`
mutation removeTodo($id: Int!) {
  removeTodo(id: $id) {
    status
    message
  }
}
`;