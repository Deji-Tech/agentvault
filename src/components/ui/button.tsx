import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "default" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[rgb(var(--primary))] text-[rgb(var(--primaryFg))] hover:opacity-90 focus-visible:ring-[rgb(var(--focus))]":
              variant === "primary",
            "bg-[rgb(var(--panel))] border border-[rgb(var(--border))] text-[rgb(var(--text))] hover:bg-[rgb(var(--chipBg))]":
              variant === "secondary",
            "bg-transparent text-[rgb(var(--text))] hover:bg-[rgb(var(--chipBg))]":
              variant === "ghost",
            "bg-[rgb(var(--danger))] text-white hover:opacity-90":
              variant === "danger",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4": size === "default",
            "h-11 px-6": size === "lg",
          },
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
