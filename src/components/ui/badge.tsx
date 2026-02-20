import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "muted" | "cyan" | "purple"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[4px] px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase",
        {
          "bg-[rgb(var(--accent-cyan))]/10 text-[rgb(var(--accent-cyan))] border border-[rgb(var(--accent-cyan))]/30":
            variant === "default" || variant === "cyan",
          "bg-[rgb(var(--accent-green))]/10 text-[rgb(var(--accent-green))] border border-[rgb(var(--accent-green))]/30":
            variant === "success",
          "bg-[rgb(var(--accent-amber))]/10 text-[rgb(var(--accent-amber))] border border-[rgb(var(--accent-amber))]/30":
            variant === "warning",
          "bg-[rgb(var(--accent-red))]/10 text-[rgb(var(--accent-red))] border border-[rgb(var(--accent-red))]/30":
            variant === "danger",
          "bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--text-muted))] border border-[rgb(var(--border-subtle))]":
            variant === "muted",
          "bg-[rgb(var(--accent-purple))]/10 text-[rgb(var(--accent-purple))] border border-[rgb(var(--accent-purple))]/30":
            variant === "purple",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
