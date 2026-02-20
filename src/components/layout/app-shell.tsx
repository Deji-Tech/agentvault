"use client";

import * as React from "react";
import { TopBar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [dangerMode, setDangerMode] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("dangerMode");
    if (stored !== null) {
      setDangerMode(stored === "true");
    }
  }, []);

  const handleDangerModeChange = (value: boolean) => {
    setDangerMode(value);
    localStorage.setItem("dangerMode", String(value));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <TopBar dangerMode={dangerMode} onDangerModeChange={handleDangerModeChange} />
      <main className="pt-14">{children}</main>
    </div>
  );
}
