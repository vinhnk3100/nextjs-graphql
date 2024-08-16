"use server";

import { cookies } from "next/headers";

const useCookies = async (COOKIE_NAME: string) => {
  const cookieStorage = cookies();
  const getAccessToken = cookieStorage.get(COOKIE_NAME)?.value;
  return {
    getAccessToken,
  };
};

export default useCookies;
