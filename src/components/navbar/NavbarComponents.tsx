"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NavbarItem from "./navbar-item/NavbarItem";
import NavbarAvatar from "./navbar-avatar/NavbarAvatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { toast } from "../ui/use-toast";
import { userRole } from "@/constants/user-list.constant";
import useGetCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

type PageProps = { title: string; href: string; description: string };

const listPages: PageProps[] = [
  {
    title: "Todo-list",
    href: "/todo",
    description: "A place for tasks checking display as list.",
  },
  {
    title: "Posts",
    href: "/post",
    description:
      "A place for user to interact with every post where user can post there own thinking.",
  },
];

const listManagementPages: PageProps[] = [
  {
    title: "User management",
    href: "/users",
    description: "User management pages for user with authority",
  },
];

const avatarProfile: { imgSrc: string } = {
  imgSrc: "https://github.com/shadcn.png",
};

export default function NavbarComponents() {
  const { user, loading, error } = useGetCurrentUser();
  const handleOnLogout = async () => {
    toast({
      title: "Logout successfully!",
      description: "Back to the login page",
      variant: "success",
      duration: 1000,
    });
    await signOut({
      redirect: true,
      callbackUrl: "/login", // Redirect URL after sign-out
    });
    return;
  };
  return (
    <nav className="bg-black py-3 relative">
      <div className="flex justify-between items-center">
        <div className="mx-20 flex flex-row items-center justify-center">
          <div className="mx-auto left-[12rem]">
            <span
              className={cn(
                navigationMenuTriggerStyle(),
                "text-2xl cursor-pointer"
              )}
            >
              <Image
                alt="logo"
                className="rounded-lg"
                src={avatarProfile.imgSrc}
                width={50}
                height={50}
              />
            </span>
          </div>
          <div className="mx-auto">
            <NavigationMenu>
              <NavigationMenuList>
                <NavbarItem href="/" menuTitle="Home" />
                <NavbarItem href="/about" menuTitle="About" />
                <NavbarItem
                  menuTitle="Pages"
                  isMenuList={true}
                  listItems={listPages}
                />
                {user?.role === userRole.Administrator ||
                user?.role === userRole.Tester ? (
                  <>
                    <NavbarItem
                      menuTitle="Management"
                      isMenuList={true}
                      listItems={listManagementPages}
                    />
                  </>
                ) : (
                  <></>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="mx-20">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <NavbarAvatar imgSrc={avatarProfile.imgSrc} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-60 bg-zinc-950 text-zinc-400 border border-zinc-800"
            >
              <DropdownMenuLabel className="text-xl">
                {user?.username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border border-zinc-800" />
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-zinc-200">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleOnLogout}
                className="focus:bg-zinc-800 focus:text-zinc-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
