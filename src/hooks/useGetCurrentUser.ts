"use server"

import { auth } from "@/auth";

const useGetCurrentUser = async () => {
    const session = await auth();
    return session;
}

export default useGetCurrentUser;