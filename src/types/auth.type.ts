export type LoginAuthDto = {
  username: string;
  password: string;
};

export type LoginAuthOutput = {
  status: boolean;
  message: string;
  statusCode: number;
  accessToken?: string;
};

export type LogoutOutput = {
  status: boolean;
  message: string;
  statusCode: number;
};

export type RegisterAuthDto = {
  username: string;
  password: string;
  email: string;
};

export type RegisterOutput = {
  status: boolean;
  message: string;
  statusCode: number;
};
