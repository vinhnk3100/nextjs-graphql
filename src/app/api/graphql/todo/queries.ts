import { gql } from "@apollo/client";

export const GET_TODOS = gql`
{
  todos {
    id
    title
    content
    priority
    dateStart
    dateEnd
    status
    userId
    username
  }
}
`;
