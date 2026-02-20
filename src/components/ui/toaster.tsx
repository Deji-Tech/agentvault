"use client"
import { Toaster as Sonner } from "sonner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn(
        "toaster group fixed bottom-4 right-4 z-[100] flex flex-col gap-2 rounded-[10px] border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 shadow-lg",
        className
      )}
      theme="light"
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-[rgb(var(--panel))] group-[.toaster]:text-[rgb(var(--text))] group-[.toaster]:border-[rgb(var(--border))] group-[.toaster]:shadow-lg rounded-[10px] border bg-[rgb(var(--panel))] text-[rgb(var(--text))]"
          ),
          description: cn(
            "group-[.toast]:text-[rgb(var(--muted))] text-[rgb(var(--muted))]"
          ),
          actionButton: cn(
            "group-[.toast]:bg-[rgb(var(--primary))] group-[.toast]:text-[rgb(var(--primary-foreground))] bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-[rgb(var(--muted))] group-[.toast]:text-[rgb(var(--muted))] bg-[rgb(var(--muted))] text-[rgb(var(--muted))]"
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
