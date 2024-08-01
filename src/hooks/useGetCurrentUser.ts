import { GET_CURRENT_USER } from "@/app/api/graphql/user/queries"
import { useQuery } from "@apollo/client"

const useGetCurrentUser = () => {
    return useQuery(GET_CURRENT_USER);
}

export default useGetCurrentUser;