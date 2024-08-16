import { gql } from "@apollo/client";

export const AUTH_LOGIN = gql`
mutation loginAuth($input: LoginAuthDto!) {
  loginAuth(loginAuthDto: $input) {
    status
    message
    accessToken
  }
}`;

export const AUTH_GOOGLE_LOGIN = gql`
mutation loginGoogleAuth($input: LoginGoogleAuthDto!) {
  loginGoogleAuth(loginGoogleAuthDto: $input) {
    status
    message
    accessToken
  }
}`;

export const AUTH_REGISTER = gql`
mutation registerUser($input: RegisterAuthDto!) {
  registerAuth(registerAuthDto: $input) {
    status
    message
  }
}`;
