import { cn } from "@/lib/utils"

function Chip({ value, className }: { value: string; className?: string }) {
  return (
    <code className={cn("font-mono text-xs bg-[rgb(var(--chipBg))] px-2 py-1 rounded border border-[rgb(var(--border))]", className)}>
      {value.slice(0, 8)}...{value.slice(-8)}
    </code>
  )
}

export { Chip }
