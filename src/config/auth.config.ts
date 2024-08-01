import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import AuthService from "@/app/api/services/auth.services";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const res = await AuthService.login(validatedFields.data);
          console.log(res);
          const user = {};
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET_KEY,
} satisfies NextAuthConfig;
