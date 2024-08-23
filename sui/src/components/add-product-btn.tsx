"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";

type Props = {};

function AddProductBtn({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  //   console.log(pathname);

  if (!pathname.includes("/products")) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => router.push("/products/new")}>
            <PlusCircleIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add New Product</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default AddProductBtn;
