// src\components\layout\desktopnav.tsx

"use client";

import Link from "next/link";
import { ChevronsLeftRightEllipsisIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNav = () => {
  return (
    <div className="hidden items-center gap-x-8 lg:flex">
      <Link href="/" className="flex items-center space-x-2">
        <ChevronsLeftRightEllipsisIcon aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">444</span>
        <span className="sr-only">Home</span>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Lobby</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      href="/"
                    >
                      <ChevronsLeftRightEllipsisIcon />
                      <div className="mt-4 mb-2 text-lg font-medium">444</div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Personalized custom shop built to meet your printing and
                        design needs
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>

                <ListItem href="/products" title="Products">
                  All the products we have to offer
                </ListItem>
                <ListItem href="/#categories" title="Categories">
                  See all categories we have
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2">
                <ListItem href="/products?category=candle" title="Candles">
                  Explore the Candles category
                </ListItem>
                <ListItem href="/products?category=magnet" title="Magnets">
                  Explore the Ref Magnets category
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default DesktopNav;
