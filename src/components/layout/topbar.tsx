"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Wallet,
  LayoutGrid,
  Bot,
  Sun,
  Moon,
  Zap,
  AlertTriangle,
  Search,
} from "lucide-react";
import { clsx } from "clsx";

interface TopBarProps {
  dangerMode: boolean;
  onDangerModeChange: (value: boolean) => void;
}

export function TopBar({ dangerMode, onDangerModeChange }: TopBarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "/agents", label: "Agents", icon: Bot },
    { href: "/dapp", label: "dApp", icon: Wallet },
    { href: "/simulator", label: "Simulator", icon: LayoutGrid },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/agents" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-zinc-100 dark:text-zinc-900" />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              AgentVault
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search agents..."
              className="h-9 w-64 pl-9 pr-4 rounded-lg bg-zinc-200 dark:bg-zinc-800 border-0 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <button
            onClick={() => onDangerModeChange(!dangerMode)}
            className={clsx(
              "flex items-center gap-2 h-9 px-3 rounded-lg text-sm font-medium transition-colors",
              dangerMode
                ? "bg-red-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            )}
          >
            {dangerMode ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {dangerMode ? "Danger" : "Safe"}
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
