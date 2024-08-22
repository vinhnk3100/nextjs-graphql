import { gql } from "@apollo/client";

export const GET_POSTS = gql`
{
  posts {
    id
    title
    thumbnail
    content
    datePost
    username
    userId
    postApproval
    postLike {
      id
    }
  }
}`;
