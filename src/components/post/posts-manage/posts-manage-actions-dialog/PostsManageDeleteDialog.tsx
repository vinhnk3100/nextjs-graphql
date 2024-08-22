import { DELETE_POST } from "@/app/api/graphql/post/mutation";
import { GET_POSTS } from "@/app/api/graphql/post/queries";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { PostProps } from "@/types/post.type";
import { useMutation } from "@apollo/client";

type PostsManageDeleteDialogProps = {
  data: PostProps;
  dialogDeleteOpen: boolean;
  setDialogDeleteOpen: (value: boolean) => void;
};

export default function PostsManageDeleteDialog({
  data,
  dialogDeleteOpen,
  setDialogDeleteOpen,
}: PostsManageDeleteDialogProps) {
  const [deletePost, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_POST, {
      update(cache, { data: { removePost } }) {
        if (removePost.status) {
          const existingPost = cache.readQuery({ query: GET_POSTS });
          const newPosts = (existingPost as any).posts.filter(
            (post: PostProps) => post.id !== data.id
          );
          cache.writeQuery({
            query: GET_POSTS,
            data: { posts: newPosts },
          });
        }
      },
    });

  const handleOnSubmitDelete = async (id: number) => {
    try {
      const res = await deletePost({ variables: { id } });
      if (res.data.removePost.status) {
        toast({
          title: res?.data.removePost.message,
          description: "Action delete post successfully!",
          variant: "success",
          duration: 1000,
        });
      }
      setDialogDeleteOpen(false);
    } catch (error: any) {
      toast({
        title: "Error has occurred",
        description: error?.message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };
  return (
    <>
      <Dialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
        {/* <DialogTrigger asChild>
          <span className="relative hover:bg-zinc-800 hover:text-zinc-200 text-zinc-400 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Delete
          </span>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[600px] bg-zinc-950 border border-zinc-800 text-zinc-200">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to remove this post?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              post and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="relative bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 text-zinc-200 flex cursor-pointer select-none items-center rounded-sm px-5 py-1.5 text-md"
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={deleteLoading}
              className="relative bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 text-zinc-200 flex cursor-pointer select-none items-center rounded-sm px-5 py-1.5 text-md"
              onClick={() => handleOnSubmitDelete(Number(data.id))}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
