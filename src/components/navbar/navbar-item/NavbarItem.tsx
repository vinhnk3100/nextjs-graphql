import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface INavbarItem {
  menuTitle: string;
  href?: string;
  isMenuList?: boolean;
  listItems?: { title: string; href: string; description: string }[];
}

export default function NavbarItem(props: INavbarItem) {
  if (props.isMenuList && props.listItems) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={cn(navigationMenuTriggerStyle(), "text-lg")}
        >
          {props.menuTitle}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[400px]">
            {props.listItems.map((listItem) => (
              <ListItem
                className="hover:bg-transparent hover:text-zinc-200"
                key={listItem.title}
                title={listItem.title}
                href={listItem.href}
              >
                {listItem.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <Link href={props.href ? props.href : "/"} legacyBehavior passHref>
        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-lg")}>
          {props.menuTitle}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
