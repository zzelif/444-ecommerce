"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ChevronsLeftRightEllipsisIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="p-8 px-8 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setIsOpen(false)}
            >
              <ChevronsLeftRightEllipsisIcon aria-hidden="true" />
              <span className="font-bold">444</span>
              <span className="sr-only">Home</span>
            </Link>
            <div className="text-sm">
              <Accordion
                type="multiple"
                defaultValue={["item-1", "item-2"]}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">
                    Lobby
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-2 text-muted-foreground">
                      <Link onClick={() => setIsOpen(false)} href="/products">
                        Products
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/#categories"
                      >
                        Categories
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-semibold">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-2 text-muted-foreground">
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/products?category=candles"
                      >
                        Candle Souvenir
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/products?category=magnets"
                      >
                        Magnet Souvenir
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
