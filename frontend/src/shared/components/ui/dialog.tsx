import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "@/constants/icons";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={` fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out ${className || ""}`}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-background p-6 shadow-xl duration-200 ${className || ""}`}
      {...props}
    >
      {children}

      <DialogPrimitive.Close className=" absolute right-4 top-4 rounded-full p-2 hover:bg-muted transition ">
        <X />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-2 ${className || ""}`} {...props} />
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-2xl font-bold ${className || ""}`}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
};
