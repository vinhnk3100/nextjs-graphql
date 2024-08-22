import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { PostProps } from "@/types/post.type";
import { PostSchema } from "@/schemas/post-schema";
import { Switch } from "@/components/ui/switch";
import { UPDATE_POST } from "@/app/api/graphql/post/mutation";
import { GET_POSTS } from "@/app/api/graphql/post/queries";

type PostsManageEditDialogProps = {
  data: PostProps;
  dialogEditOpen: boolean;
  setDialogEditOpen: (value: boolean) => void;
};

type PostsManageProps = {
  posts: PostProps[];
};

export default function PostsManageEditDialog({
  data,
  dialogEditOpen,
  setDialogEditOpen,
}: PostsManageEditDialogProps) {
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: data.title,
      thumbnail: data.thumbnail,
      content: data.content,
      username: data.username,
      postApproval: data.postApproval,
    },
  })
  const [editPost, { loading: editLoading, error: editError }] = useMutation(
    UPDATE_POST,
    {
      update(cache, { data: { updatePost } }) {
        if (updatePost.status) {
          const existingPosts = cache.readQuery({ query: GET_POSTS });
          if (existingPosts && (existingPosts as PostsManageProps).posts) {
            cache.writeQuery({
              query: GET_POSTS,
              data: {
                posts: existingPosts,
              },
            });
          }
        }
      },
    }
  );

  const handleOnSubmitFormEdit = async (values: z.infer<typeof PostSchema>) => {
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
      const res = await editPost({
        variables: { id: Number(data.id), input: validateFields.data },
      });
      if (res.data.updatePost.message) {
        toast({
          title: "Action success!",
          description: "Updated post action successfully!",
          variant: "success",
          duration: 1200,
        });

        setDialogEditOpen(false);
        return;
      } else {
        throw new Error(res.data.updatePost.message);
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Invalid fields validate",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Dialog open={dialogEditOpen} onOpenChange={setDialogEditOpen}>
        {/* <DialogTrigger asChild>
          <span className="relative hover:bg-zinc-800 hover:text-zinc-200 text-zinc-400 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Edit
          </span>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[600px] bg-zinc-950 border border-zinc-800 text-zinc-200">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmitFormEdit)}
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
                            placeholder="Post content..."
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
              {/* Owner post */}
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Post owner</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            disabled
                            placeholder="Post content..."
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              {/* Post approve */}
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="postApproval"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Post owner</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <DialogFooter className="flex w-full">
                <Button
                  disabled={editLoading}
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
