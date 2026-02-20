import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import { useState } from "react"

function Chip({ value, className, full }: { value: string; className?: string; full?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayValue = full ? value : value.length > 16 ? `${value.slice(0, 8)}...${value.slice(-8)}` : value

  return (
    <div className={cn("group relative inline-flex items-center gap-1.5", className)}>
      <code className="font-mono text-[11px] bg-[rgb(var(--bg-tertiary))] px-2 py-1 rounded-[4px] border border-[rgb(var(--border-subtle))] text-[rgb(var(--text-secondary))]">
        {displayValue}
      </code>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[rgb(var(--bg-tertiary))] rounded"
      >
        <Copy className="w-3 h-3 text-[rgb(var(--text-muted))]" />
      </button>
      {copied && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-[rgb(var(--accent-green))] text-black px-1.5 py-0.5 rounded animate-fade-in">
          COPIED
        </span>
      )}
    </div>
  )
}

export { Chip }
