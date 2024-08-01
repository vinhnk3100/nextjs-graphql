import { gql } from "@apollo/client";

export const AUTH_LOGIN = gql`
mutation loginAuth($input: LoginAuthDto!) {
  loginAuth(loginAuthDto: $input) {
    status
    message
    accessToken
    user {
      id
      username
      email
      role
    }
  }
}
`;