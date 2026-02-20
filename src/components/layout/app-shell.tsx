"use client";

import * as React from "react";
import { TopBar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [dangerMode, setDangerMode] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
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
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      <TopBar dangerMode={mounted && dangerMode} onDangerModeChange={handleDangerModeChange} />
      <main className={`pt-14 ${mounted && dangerMode ? 'pt-22' : ''}`}>
        <div className="max-w-[1600px] mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
