import { ReactNode } from "react";

interface Body2Props {
  children: ReactNode;
}

export function Body2({ children }: Body2Props) {
  return <span className='text-sm text-end'>{children}</span>;
}