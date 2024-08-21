import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

function Spinner({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mt-auto mb-auto ml-auto mr-auto  h-20 w-20 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ",
        className
      )}
      role="status"
    ></div>
  );
}

export default Spinner;
