import clsx from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx("ls-card", hover && "ls-card-hover", className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";
