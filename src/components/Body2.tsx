import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Body2Props {
  children: ReactNode;
  className?: string;
}

export function Body2({ children , className}: Body2Props) {
  return <p className={cn("text-sm font-normal leading-relaxed text-muted-foreground", className)}>{children}</p>;
}