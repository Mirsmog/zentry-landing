import { cn } from "@/utils";
import React, { ReactNode } from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<IButton> = ({ children, className, id, leftIcon, rightIcon }) => {
  return (
    <button
      className={cn(
        "relative group z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black flex items-center gap-2",
        className,
      )}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">{children}</span>
      {rightIcon}
    </button>
  );
};

export default Button;
