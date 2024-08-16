import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
{
  currentUser {
    status
    message
    data {
      id
      username
      email
      role
    }
  }
}`;

export const GET_USERS = gql`
{
  users {
    id
    username
    email
    role
  }
}`;