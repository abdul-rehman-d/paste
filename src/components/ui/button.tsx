import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"underline underline-offset-2 font-bold py-1 cursor-pointer",
	{
		variants: {
			variant: {
				default: "text-orange-300 hover:text-orange-400",
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

function Button({ className, variant = "default", ...props }: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, className }))} {...props} />
	);
}

export { Button, buttonVariants };
