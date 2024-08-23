import React from "react";
import {
  CircleUser,
  Home,
  HomeIcon,
  Menu,
  Package2Icon,
  PlusCircleIcon,
  TagIcon,
  UsersRoundIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CustomNavLink from "./custom-navlink";
import AddProductBtn from "./add-product-btn";

type Props = {};

function HomeHeader({}: Props) {
  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <CustomNavLink href="/">
          <HomeIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </CustomNavLink>

        <CustomNavLink href="/orders">Orders</CustomNavLink>
        <CustomNavLink href="/products">Products</CustomNavLink>
        <CustomNavLink href="/users">Customers</CustomNavLink>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <CustomNavLink href="/">
              <Home className="h-6 w-6" />
              <span className="ml-3">Home</span>
            </CustomNavLink>
            <CustomNavLink href="/orders">
              <Package2Icon />
              <span className="ml-3">Orders</span>
            </CustomNavLink>
            <CustomNavLink href="/products">
              <TagIcon />
              <span className="ml-3">Products</span>
            </CustomNavLink>
            <CustomNavLink href="/users">
              <UsersRoundIcon />
              <span className="ml-3">Costumers</span>
            </CustomNavLink>

            {/* <Link href="/settings" className="hover:text-foreground">
              Settings
            </Link> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto"></div>
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form> */}

        <AddProductBtn />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default HomeHeader;
