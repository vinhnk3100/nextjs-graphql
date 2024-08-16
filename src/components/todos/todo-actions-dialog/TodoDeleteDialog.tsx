import { DELETE_TODO } from "@/app/api/graphql/todo/mutation";
import { GET_TODOS } from "@/app/api/graphql/todo/queries";
import TodoService from "@/app/api/services/todo.services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Todo } from "@/types/todos.type";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

type TodoDeleteDialogProps = {
  data: Todo;
  dialogDeleteOpen: boolean;
  setDialogDeleteOpen: (value: boolean) => void;
};

export default function TodoDeleteDialog({
  data,
  dialogDeleteOpen,
  setDialogDeleteOpen,
}: TodoDeleteDialogProps) {
  const [deleteTodo, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_TODO, {
      update(cache, { data: { removeTodo } }) {
        if (removeTodo.status) {
          const existingTodos = cache.readQuery({ query: GET_TODOS });
          const newTodos = (existingTodos as any).todos.filter(
            (todo: Todo) => todo.id !== data.id
          );
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: newTodos },
          });
        }
      },
    });

  const handleOnSubmitDelete = async (id: number) => {
    try {
      const res = await deleteTodo({ variables: { id } });
      if (res.data.removeTodo.status) {
        toast({
          title: res?.data.removeTodo.message,
          description: "Action delete todo successfully!",
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
              Are you sure you want to delete this todo-task?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              todo task and remove it from our servers.
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
