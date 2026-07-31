import clsx from "clsx";
import type { HTMLAttributes } from "react";

export default function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-6", className)} {...props} />;
}
