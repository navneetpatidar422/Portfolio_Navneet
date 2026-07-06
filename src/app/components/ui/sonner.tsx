import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-neutral-900 group-[.toaster]:text-white group-[.toaster]:border-neutral-800 group-[.toaster]:shadow-lg",
          description: "group-[.toaster]:text-neutral-400",
          actionButton:
            "group-[.toaster]:bg-white group-[.toaster]:text-black",
          cancelButton:
            "group-[.toaster]:bg-neutral-800 group-[.toaster]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
