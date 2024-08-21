"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

function CustomNavLink({ children, href, className }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 md:text-lg transition-colors cursor-pointer hover:text-muted-foreground",
        isActive(href) ? "text-primary font-semibold" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
}

export default CustomNavLink;
