import { PostProps } from "@/types/post.type";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import {
  PiArrowFatUpBold,
  PiArrowFatDownBold,
  PiShareFatBold,
  PiArrowFatUpFill,
} from "react-icons/pi";
import { FaRegComments } from "react-icons/fa";
import useGetCurrentUser from "@/hooks/useCurrentUser";
import { UserProps } from "@/types/user.type";
import { useMutation } from "@apollo/client";
import { DISLIKE_POST, LIKE_POST } from "@/app/api/graphql/post/mutation";
import { GET_POSTS } from "@/app/api/graphql/post/queries";
import { toast } from "../ui/use-toast";

type PostCardListProps = {
  data: PostProps[];
};

export default function PostCardList({ data }: PostCardListProps) {
  const { user, loading, error } = useGetCurrentUser();
  const [likePost, { loading: likePostLoading, error: likePostError }] =
    useMutation(LIKE_POST, {
      update(cache, { data: { likePost } }) {
        if (likePost.status) {
          const existedPost = cache.readQuery({ query: GET_POSTS });
          if (existedPost) {
            cache.writeQuery({
              query: GET_POSTS,
              data: {
                posts: existedPost,
              },
            });
          }
        }
      },
    });

  const [
    dislikePost,
    { loading: dislikePostLoading, error: dislikePostError },
  ] = useMutation(DISLIKE_POST, {
    update(cache, { data: { dislikePost } }) {
      if (dislikePost.status) {
        const existedPost = cache.readQuery({ query: GET_POSTS });
        if (existedPost) {
          cache.writeQuery({
            query: GET_POSTS,
            data: {
              posts: existedPost,
            },
          });
        }
      }
    },
  });

  const handleLikePostAction = async (id: number) => {
    try {
      const res = await likePost({
        variables: { id: Number(id) },
      });
      if (res.data.likePost.status) {
        toast({
          title: "Action success!",
          description: res.data.likePost.message,
          variant: "success",
          duration: 1200,
        });
      } else {
        toast({
          title: "Action success!",
          description: res.data.likePost.message,
          variant: "success",
          duration: 1200,
        });
      }
      return;
    } catch (error: any) {
      toast({
        title: "Error Occurred",
        description: error.message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleDislikePostAction = async (id: number) => {
    try {
      const res = await dislikePost({
        variables: { id: Number(id) },
      });
      if (res.data.dislikePost.status) {
        toast({
          title: "Action success!",
          description: res.data.dislikePost.message,
          variant: "success",
          duration: 1200,
        });
      } else {
        toast({
          title: "Action success!",
          description: res.data.dislikePost.message,
          variant: "success",
          duration: 1200,
        });
      }
      return;
    } catch (error: any) {
      toast({
        title: "Error Occurred",
        description: error.message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };
  return (
    <>
      {data.map((post) => {
        return (
          <>
            {post.postApproval && (
              <Card
                key={post.id}
                className="group w-[310px] transition-all hover:cursor-pointer bg-zinc-900 border border-zinc-900 hover:border-zinc-200 p-0"
              >
                <CardHeader>
                  <CardTitle className="text-zinc-400 group-hover:text-zinc-200">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-400 h-full group-hover:text-zinc-200">
                    <div className="my-3 line-clamp-1 overflow-ellipsis">
                      {post.content}
                    </div>
                    <div className="my-3 line-clamp-1 overflow-ellipsis text-sm">
                      {post.datePost}
                    </div>
                    <Image
                      className="mt-14 h-48 w-full bg-no-repeat content-center rounded-xl"
                      width={500}
                      height={500}
                      src={post.thumbnail}
                      alt={"thumbnail"}
                    />
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex align-middle justify-between">
                  <div className="flex">
                    {post.postLike.find((x: UserProps) => x.id === user.id) ? (
                      <Button
                        onClick={() => handleLikePostAction(post.id)}
                        className="bg-zinc-800 hover:bg-zinc-600"
                      >
                        <PiArrowFatUpFill className="text-1xl text-green-600" />
                        <span className="ml-2 text-green-600">
                          {post.postLike.length}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleLikePostAction(post.id)}
                        className="bg-zinc-800 hover:bg-zinc-600"
                      >
                        <PiArrowFatUpBold className="text-1xl" />
                        <span className="ml-2">{post.postLike.length}</span>
                      </Button>
                    )}

                    {post.postDislike.find(
                      (x: UserProps) => x.id === user.od
                    ) ? (
                      <Button className="bg-zinc-800 hover:bg-zinc-600">
                        <PiArrowFatDownBold className="text-1xl" />
                      </Button>
                    ) : (
                      <Button className="bg-zinc-800 hover:bg-zinc-600">
                        <PiArrowFatDownBold className="text-1xl" />
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-center gap-6">
                    <Button className="bg-zinc-800 hover:bg-zinc-600">
                      <FaRegComments className="text-1xl" />
                    </Button>
                    <Button className="bg-zinc-800 hover:bg-zinc-600">
                      <PiShareFatBold className="text-1xl" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </>
        );
      })}
    </>
  );
}
