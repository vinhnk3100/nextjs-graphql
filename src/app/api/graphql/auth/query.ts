import { gql } from "@apollo/client";

export const AUTH_LOGOUT = gql`
{
  logout{
    status
    message
  }
}`;