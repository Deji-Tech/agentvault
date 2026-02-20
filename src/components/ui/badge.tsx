import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "muted"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-[rgb(var(--primary))/10] text-[rgb(var(--primary))]": variant === "default",
          "bg-[rgb(var(--success))/10] text-[rgb(var(--success))]": variant === "success",
          "bg-[rgb(var(--warning))/10] text-[rgb(var(--warning))]": variant === "warning",
          "bg-[rgb(var(--danger))/10] text-[rgb(var(--danger))]": variant === "danger",
          "bg-[rgb(var(--chipBg))] text-[rgb(var(--muted))]": variant === "muted",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
