import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { PostProps } from "@/types/post.type";
import { PostSchema } from "@/schemas/post-schema";
import { CREATE_POST } from "@/app/api/graphql/post/mutation";
import { GET_POSTS } from "@/app/api/graphql/post/queries";
import useGetCurrentUser from "@/hooks/useCurrentUser";

type PostsManageProps = {
  posts: PostProps[];
};

export default function PostsManageAddDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { user, loading, error } = useGetCurrentUser();
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: "",
      username: "",
      postApproval: false,
    },
  });

  const [createPost, { loading: createLoading, error: createError }] =
    useMutation(CREATE_POST, {
      update(cache, { data: { createPost } }) {
        if (createPost.status) {
          const existingPost = cache.readQuery({ query: GET_POSTS });
          if (existingPost && (existingPost as PostsManageProps).posts) {
            cache.writeQuery({
              query: GET_POSTS,
              data: {
                posts: [
                  createPost.data,
                  ...(existingPost as PostsManageProps).posts,
                ],
              },
            });
          }
        }
      },
    });

  const handleOnSubmitFormAdd = async (values: z.infer<typeof PostSchema>) => {
    const validateFields = PostSchema.safeParse(values);
    if (!validateFields.success) {
      toast({
        title: "Error Occurred",
        description: "Invalid fields validate",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }
    try {
      const res = await createPost({
        variables: { input: { ...validateFields.data, username: user.username } },
      });
      console.log(res);
      if (res.data.createPost.status) {
        toast({
          title: res.data.createPost.message,
          description: "Updated post action successfully!",
          variant: "success",
          duration: 1200,
        });
        setIsOpenDialog(false);
      } else {
        throw new Error(res.data.createPost.message);
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description:
          error instanceof Error ? error.message : "Failed to create post",
        variant: "destructive",
        duration: 1000,
      });
    }
  };
  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>
          <span className="gap-2 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-200 flex cursor-pointer select-none items-center rounded-sm p-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <span>Add</span> <FaPlus />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-zinc-950 border border-zinc-800 text-zinc-200">
          <DialogHeader>
            <DialogTitle>Add</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmitFormAdd)}
              className="flex flex-col items-center gap-4 mt-4"
            >
              {/* Title */}
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Title</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Post title..."
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              {/* Thumbnail */}
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Thumbnail</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Thumbnail content..."
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              {/* Content */}
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Content</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Post content..."
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <DialogFooter className="flex w-full">
                <Button
                  disabled={createLoading}
                  type="submit"
                  className="bg-zinc-800 border border-zinc-800 hover:bg-zinc-600"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
