import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "underline underline-offset-2 font-bold py-1 cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-primary/80 hover:text-primary",
        boring:
          "text-neutral-400 hover:text-neutral-300 no-underline underline-offset-auto font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      type={type}
      {...props}
    />
  );
}

export { Button, buttonVariants };
