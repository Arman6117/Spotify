import React from "react";
import { twMerge } from "tailwind-merge";
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}
const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`w-full bg-neutral-900 h-fit rounded-lg`,className)}>
      {children}
    </div>
  );
};

export default Box;
