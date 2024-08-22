"use client"

import { GET_POSTS } from "@/app/api/graphql/post/queries";
import { postsManageColumns, PostsManageDataTable } from "@/components/post";
import useGetCurrentUser from "@/hooks/useCurrentUser";
import { PostProps } from "@/types/post.type";
import { useQuery } from "@apollo/client";

export default function PostsManagePage() {
  const { loading, error, data } = useQuery(GET_POSTS);
  return (
    <>
      {!data ? (
        <div className="bg-zinc-950 mt-10 text-white">
          <PostsManageDataTable
            columns={postsManageColumns}
            data={[] as PostProps[]}
          />{" "}
        </div>
      ) : (
        <div className="bg-zinc-950 mt-10 text-white">
          <PostsManageDataTable
            columns={postsManageColumns}
            data={data.posts as PostProps[]}
          />{" "}
        </div>
      )}
    </>
  );
}
