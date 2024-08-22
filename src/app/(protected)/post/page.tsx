"use client";

import { GET_POSTS } from "@/app/api/graphql/post/queries";
import { PostCardList } from "@/components/post";
import { useQuery } from "@apollo/client";

export default function PostPage() {
  const { loading, error, data } = useQuery(GET_POSTS);
  return (
    <div className="mt-8 grid grid-cols-5 gap-y-10">
      {!data ? (
        <>Loading</>
      ) : (
        <>
          <PostCardList data={data.posts} />
        </>
      )}
    </div>
  );
}
