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

const listPages: { title: string; href: string; description: string }[] = [
  {
    title: "Todo-list",
    href: "/todo",
    description:
      "A place for tasks checking display as list.",
  },
  {
    title: "Posts",
    href: "/post",
    description:
      "A place for user to interact with every post where user can post there own thinking.",
  }
];

const avatarProfile: { imgSrc: string } = {
  imgSrc: "https://github.com/shadcn.png",
};

export default function NavbarComponents() {
  return (
    <nav className="bg-black p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row items-center justify-center">
          <div className="space-x-4 absolute left-[12rem]">
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
          <div className="space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavbarItem href="/" menuTitle="Home" />
                <NavbarItem href="/about" menuTitle="About" />
                <NavbarItem
                  menuTitle="Pages"
                  isMenuList={true}
                  listItems={listPages}
                />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="space-x-4">
          <NavbarAvatar imgSrc={avatarProfile.imgSrc} />
        </div>
      </div>
    </nav>
  );
}
