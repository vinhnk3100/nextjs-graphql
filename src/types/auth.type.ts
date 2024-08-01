import { UserAuthOutput } from "./user.type";

export type LoginAuthDto = {
    username: string;
    password: string;
}

export type LoginAuthOutput = {
    status: boolean;
    message: string;
    accessToken: string;
    user: UserAuthOutput;
}