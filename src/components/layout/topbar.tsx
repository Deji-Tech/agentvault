"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Wallet,
  LayoutGrid,
  Bot,
  Sun,
  Zap,
  AlertTriangle,
  Search,
  Terminal,
  Activity,
} from "lucide-react";
import { clsx } from "clsx";
import { Switch } from "@/components/ui/switch";

interface TopBarProps {
  dangerMode: boolean;
  onDangerModeChange: (value: boolean) => void;
}

export function TopBar({ dangerMode, onDangerModeChange }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/agents/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navItems = [
    { href: "/agents", label: "AGENTS", icon: Bot },
    { href: "/dapp", label: "dAPP", icon: LayoutGrid },
    { href: "/simulator", label: "SIMULATOR", icon: Terminal },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-[rgb(var(--bg-secondary))] border-b border-[rgb(var(--border-subtle))] z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/agents" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-[4px] bg-[rgb(var(--accent-cyan))] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--accent-cyan))] to-[rgb(var(--accent-green))] opacity-80" />
                <Zap className="w-5 h-5 text-black relative z-10" />
                <div className="absolute inset-0 bg-[rgb(var(--accent-cyan))] opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[rgb(var(--text-primary))]">
                AGENT<span className="text-[rgb(var(--accent-cyan))]">VAULT</span>
              </span>
            </Link>

            {/* Status indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))]">
              <div className="w-2 h-2 rounded-full bg-[rgb(var(--accent-green))] animate-pulse" />
              <span className="text-xs text-[rgb(var(--text-secondary))]">DEVNET</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-bold tracking-wider transition-all duration-200",
                    isActive
                      ? "bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--accent-cyan))] border border-[rgb(var(--border-default))]"
                      : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-tertiary))]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--text-muted))]" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-56 pl-9 pr-4 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))] text-sm text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] focus:outline-none focus:border-[rgb(var(--accent-cyan))] transition-colors"
              />
            </form>

            {/* Danger Mode Toggle */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))]">
              {dangerMode ? (
                <AlertTriangle className="w-4 h-4 text-[rgb(var(--accent-red))]" />
              ) : (
                <ShieldIcon className="w-4 h-4 text-[rgb(var(--text-muted))]" />
              )}
              <span className={clsx(
                "text-xs font-bold tracking-wider",
                dangerMode ? "text-[rgb(var(--accent-red))]" : "text-[rgb(var(--text-muted))]"
              )}>
                {dangerMode ? "DANGER" : "SAFE"}
              </span>
              <Switch
                checked={dangerMode}
                onCheckedChange={onDangerModeChange}
                className="data-[state=checked]:bg-[rgb(var(--accent-red))]"
              />
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "dark" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))] text-[rgb(var(--text-muted))] hover:text-[rgb(var(--accent-cyan))] hover:border-[rgb(var(--accent-cyan))] transition-all"
              >
                {theme === "dark" ? (
                  <Activity className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Danger Banner */}
      {dangerMode && (
        <div className="fixed top-14 left-0 right-0 h-8 bg-[rgb(var(--accent-red))]/10 border-b border-[rgb(var(--accent-red))]/30 flex items-center px-6 z-40">
          <AlertTriangle className="w-3 h-3 text-[rgb(var(--accent-red))] mr-2 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-[rgb(var(--accent-red))]">
            DANGER MODE ENABLED — ARBITRARY TRANSFERS UNLOCKED
          </span>
        </div>
      )}
    </>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
