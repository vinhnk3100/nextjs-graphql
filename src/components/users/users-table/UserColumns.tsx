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
import { userRole } from "@/constants/user-list.constant";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserProps } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const userColumns: ColumnDef<UserProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div
          className={`${
            user.role === "User"
              ? "border-green-700 bg-green-700 box border rounded-md w-fit p-1 cursor-default"
              : user.role === "Tester"
              ? "border-orange-500 bg-orange-500 box border rounded-md w-fit p-1 cursor-default"
              : "border-red-500 bg-red-500 box border rounded-md w-fit p-1 cursor-default"
          }`}
        >
          {userRole[user.role as keyof typeof userRole]}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
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
        </>
      );
    },
  },
];

export default userColumns;
