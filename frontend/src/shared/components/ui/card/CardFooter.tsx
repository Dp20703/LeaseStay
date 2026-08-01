import type { HTMLAttributes } from "react";
import clsx from "clsx";

export default function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "px-6 py-4 border-t border-border-light dark:border-border-dark",
        className,
      )}
      {...props}
    />
  );
}
