"use client";

import { GET_USERS } from "@/app/api/graphql/user/queries";
import { userColumns, UserDataTable } from "@/components/users";
import { UserProps } from "@/types/user.type";
import { useQuery } from "@apollo/client";

export default function UsersPage() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <>
      {loading ? (
        <div className="bg-zinc-950 mt-10 text-white">
          <UserDataTable columns={userColumns} data={[] as UserProps[]} />{" "}
        </div>
      ) : (
        <div className="bg-zinc-950 mt-10 text-white">
          <UserDataTable columns={userColumns} data={data.users as UserProps[]} />{" "}
        </div>
      )}
    </>
  );
}
