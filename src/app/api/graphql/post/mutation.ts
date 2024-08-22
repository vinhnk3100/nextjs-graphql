import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation createPost($input: CreatePostDto!) {
  createPost(createPostDto: $input) {
    status
    message
    data {
      id
      title
      content
      thumbnail
      datePost
      username
      userId
      postApproval
    }
  }
}`;

export const UPDATE_POST = gql`
mutation updatePost($id: Int!, $input: UpdatePostDto!) {
  updatePost(id: $id, updatePostDto: $input) {
    status
    message
  }
}`;

export const DELETE_POST = gql`
mutation removePost($id: Int!) {
  removePost(id: $id) {
    status
    message
  }
}`;

export const LIKE_POST = gql`
mutation likePost($id: Int!) {
  likePost(id: $id) {
    status
    message
    data {
      id
      title
      postLike {
        id
        username
      }
    }
  }
}`;

export const DISLIKE_POST = gql`
mutation dislikePost($id: Int!) {
  dislikePost(id: $id) {
    status
    message
    data {
      id
      title
      postLike {
        id
        username
      }
    }
  }
}`;