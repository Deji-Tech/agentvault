import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success"
  size?: "sm" | "default" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-bold tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-cyan))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg-primary))] disabled:opacity-40 disabled:cursor-not-allowed",
          {
            "bg-[rgb(var(--accent-cyan))] text-black hover:bg-[rgb(var(--accent-cyan))]/90 hover:shadow-[0_0_20px_rgba(var(--glow-cyan))]":
              variant === "primary",
            "bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-default))] text-[rgb(var(--text-primary))] hover:border-[rgb(var(--accent-cyan))] hover:text-[rgb(var(--accent-cyan))]":
              variant === "secondary",
            "bg-transparent text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-tertiary))] hover:text-[rgb(var(--text-primary))]":
              variant === "ghost",
            "bg-[rgb(var(--accent-red))] text-white hover:bg-[rgb(var(--accent-red))]/90 hover:shadow-[0_0_20px_rgba(var(--glow-red))]":
              variant === "danger",
            "bg-[rgb(var(--accent-green))] text-black hover:bg-[rgb(var(--accent-green))]/90 hover:shadow-[0_0_20px_rgba(var(--glow-green))]":
              variant === "success",
          },
          {
            "h-7 px-2.5 text-[10px]": size === "sm",
            "h-9 px-4 text-xs": size === "default",
            "h-11 px-6 text-sm": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          "rounded-[4px]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
