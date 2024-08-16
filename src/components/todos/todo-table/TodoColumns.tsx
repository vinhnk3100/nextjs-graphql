"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { todoPriority, todoStatus } from "@/constants/todo-list.constant";
import { Todo } from "@/types/todos.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import TodoEditDialog from "../todo-actions-dialog/TodoEditDialog";
import TodoDeleteDialog from "../todo-actions-dialog/TodoDeleteDialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatedDate } from "@/utils/date.utils";
import { useState } from "react";

const todoColumns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <div
          className={`${
            todo.priority === "HIGH"
              ? "border-red-500 bg-red-500 box border rounded-md w-fit p-1 cursor-default"
              : todo.priority === "MEDIUM"
              ? "border-orange-500 bg-orange-500 box border rounded-md w-fit p-1 cursor-default"
              : "border-yellow-500 bg-yellow-500 box border rounded-md w-fit p-1 cursor-default"
          }`}
        >
          {todoPriority[todo.priority as keyof typeof todoPriority]}
        </div>
      );
    },
  },
  {
    accessorKey: "dateStart",
    header: "Date start",
    cell: ({ row }) => {
      const todo = row.original;
      return <span>{formatedDate(todo.dateStart)}</span>;
    },
  },
  {
    accessorKey: "dateEnd",
    header: "Date end",
    cell: ({ row }) => {
      const todo = row.original;
      return <span>{formatedDate(todo.dateEnd)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <div
          className={`${
            todo.status === "DONE"
              ? "border-green-700 bg-green-700 box border rounded-md w-fit p-1 cursor-default"
              : todo.status === "IN_PROGRESS"
              ? "border-orange-500 bg-orange-500 box border rounded-md w-fit p-1 cursor-default"
              : "border-red-500 bg-red-500 box border rounded-md w-fit p-1 cursor-default"
          }`}
        >
          {todoStatus[todo.status]}
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "User",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const todo = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [dropdownOpen, setDropdownOpen] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [dialogEditOpen, setDialogEditOpen] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);

      const handleOnOpenDialogEdit = () => {
        setDialogEditOpen(true);
      };

      const handleOnOpenDialogDelete = () => {
        setDialogDeleteOpen(true);
      };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { currentUser } = useCurrentUser();
      return (
        <>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            {currentUser?.username === todo.username ||
            currentUser?.role === "admin" ? (
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-zinc-800 hover:text-white data-[state=open]:bg-zinc-800"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            ) : (
              <></>
            )}
            <DropdownMenuContent
              align="end"
              className="bg-zinc-950 text-zinc-200"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOnOpenDialogEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOnOpenDialogDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog action  */}
          <TodoEditDialog
            dialogEditOpen={dialogEditOpen}
            setDialogEditOpen={setDialogEditOpen}
            data={todo}
          />

          <TodoDeleteDialog
            data={todo}
            dialogDeleteOpen={dialogDeleteOpen}
            setDialogDeleteOpen={setDialogDeleteOpen}
          />
        </>
      );
    },
  },
];

export default todoColumns;
