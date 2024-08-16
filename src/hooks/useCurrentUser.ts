import { GET_CURRENT_USER } from "@/app/api/graphql/user/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

const useGetCurrentUser = () => {
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    context: {
      headers: {
        Authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : "",
      },
    },
  });
  return {
    user: data?.currentUser?.data,
    loading,
    error,
  };
};

export default useGetCurrentUser;
