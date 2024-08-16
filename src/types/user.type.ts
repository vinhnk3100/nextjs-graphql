export type UserProps = {
    id: number;
    username: string;
    email: string;
    role: string;
}

export type CurrentUserOutput = {
  status: boolean;
  message: string;
  statusCode: number;
  data?: UserProps;
};