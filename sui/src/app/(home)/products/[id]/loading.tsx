import Spinner from "@/components/spinner";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

function loading({}: Props) {
  return <Spinner />;
}

export default loading;
