import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const paragraphsVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface paragraphsProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphsVariants> {}

const paragraphs = forwardRef<HTMLParagraphElement, paragraphsProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(paragraphsVariants({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

paragraphs.displayName = "paragraphs";

export default paragraphs;
