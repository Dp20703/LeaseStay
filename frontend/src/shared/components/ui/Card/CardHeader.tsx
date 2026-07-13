import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "px-6 pt-6 pb-4 border-b border-border-light dark:border-border-dark",
        className,
      )}
      {...props}
    />
  );
}
