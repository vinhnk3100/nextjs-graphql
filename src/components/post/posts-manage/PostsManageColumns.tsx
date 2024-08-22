"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { postStatusApproval } from "@/constants/post-list.constant";
import { PostProps } from "@/types/post.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineFundView } from "react-icons/ai";
import PostsManageEditDialog from "./posts-manage-actions-dialog/PostsManageEditDialog";
import { formatedDateTime } from "@/utils/date.utils";
import PostsManageDeleteDialog from "./posts-manage-actions-dialog/PostsManageDeleteDialog";

const postsManageColumns: ColumnDef<PostProps>[] = [
  {
    accessorKey: "id",
    header: "Post ID",
  },
  {
    accessorKey: "title",
    header: "Post title",
    cell: ({ row }) => {
      const post = row.original;
      return <div className="w-max">{post.title}</div>;
    },
  },
  {
    accessorKey: "thumbnail",
    header: "Post thumbnail",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="w-max group relative hover:cursor-pointer transition-all hover:transition-all hover:scale-110">
          <Dialog>
            <DialogTrigger asChild>
              <span>
                <AiOutlineFundView className="transition-all group-hover:flex hidden absolute h-20 w-14 m-auto left-0 right-0 top-0 bottom-0" />
                <Image
                  className="transition-all group-hover:opacity-10"
                  alt="thumbnail"
                  src={post.thumbnail}
                  width={100}
                  height={100}
                />
              </span>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 m-0 p-2 border border-zinc-900">
              <DialogHeader>
                <Image
                  className="border rounded-sm border-zinc-900"
                  alt="thumbnail"
                  src={post.thumbnail}
                  width={500}
                  height={500}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Post content",
  },
  {
    accessorKey: "datePost",
    header: "Post create date",
    cell: ({ row }) => {
      const todo = row.original;
      return <span>{formatedDateTime(todo.datePost)}</span>;
    },
  },
  {
    accessorKey: "username",
    header: "Post owner",
  },
  {
    accessorKey: "postApproval",
    header: "Post approval by Admin",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div
          className={`${
            post.postApproval
              ? "border-green-700 bg-green-700 box border rounded-md w-fit p-1 cursor-default hover:bg-green-500"
              : "border-red-700 bg-red-700 box border rounded-md w-fit p-1 cursor-default hover:bg-red-500"
          }`}
        >
          {/* {todoStatus[todo.status]} */}
          {post.postApproval
            ? postStatusApproval.APPROVE
            : postStatusApproval.FALSE}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const post = row.original;
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
      return (
        <>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-zinc-800 hover:text-white data-[state=open]:bg-zinc-800"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
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
          <PostsManageEditDialog
            dialogEditOpen={dialogEditOpen}
            setDialogEditOpen={setDialogEditOpen}
            data={post}
          />

          <PostsManageDeleteDialog
            data={post}
            dialogDeleteOpen={dialogDeleteOpen}
            setDialogDeleteOpen={setDialogDeleteOpen}
          />
        </>
      );
    },
  },
];

export default postsManageColumns;
