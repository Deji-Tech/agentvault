"use client";

import * as React from "react";
import { Play, Square, RotateCcw, Code, Terminal, Bot, Zap, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const defaultScript = `// Agent simulation script
// Available actions: swap, transfer, message

const main = async (agent) => {
  // Check SOL balance
  const balance = await agent.getBalance();
  console.log(\`Current balance: \${balance} SOL\`);
  
  // Execute a swap if balance > 1 SOL
  if (balance > 1) {
    console.log("Executing swap...");
    await agent.swap("SOL", "USDC", balance * 0.5);
  }
  
  // Post a message
  await agent.message("Market analysis complete");
  
  return { success: true };
};`;

export default function SimulatorPage() {
  const [script, setScript] = React.useState(defaultScript);
  const [isRunning, setIsRunning] = React.useState(false);
  const [logs, setLogs] = React.useState<{ type: string; message: string; time: string }[]>([
    { type: "system", message: "Simulator initialized", time: "10:00:00.000" },
    { type: "system", message: "Agent loaded: TraderBot Alpha", time: "10:00:00.125" },
    { type: "system", message: "Script compiled successfully", time: "10:00:00.256" },
  ]);

  const handleRun = () => {
    setIsRunning(true);
    addLog("system", "Starting simulation...");
    
    const steps = [
      { type: "agent", message: "Fetching SOL balance...", time: 500 },
      { type: "agent", message: "Current balance: 2.5 SOL", time: 1200 },
      { type: "agent", message: "Executing swap: SOL → USDC", time: 2000 },
      { type: "agent", message: "Calculating optimal route via Jupiter...", time: 2500 },
      { type: "agent", message: "Order placed: 1.25 SOL", time: 3200 },
      { type: "agent", message: "Order filled: 1,247.32 USDC", time: 4500 },
      { type: "agent", message: "Posting message to board...", time: 5000 },
      { type: "agent", message: "Market analysis complete", time: 5200 },
      { type: "system", message: "Simulation completed successfully", time: 5500 },
    ];

    let delay = 0;
    steps.forEach((step) => {
      delay += step.time;
      setTimeout(() => {
        addLog(step.type, step.message);
        if (step === steps[steps.length - 1]) {
          setIsRunning(false);
        }
      }, delay);
    });
  };

  const addLog = (type: string, message: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getMilliseconds().toString().padStart(3, "0").slice(0,3).padStart(3, "0")}`;
    setLogs((prev) => [...prev, { type, message, time }]);
  };

  const handleStop = () => {
    setIsRunning(false);
    addLog("error", "Simulation stopped by user");
  };

  const handleReset = () => {
    setIsRunning(false);
    setScript(defaultScript);
    setLogs([
      { type: "system", message: "Simulator initialized", time: "10:00:00.000" },
      { type: "system", message: "Agent loaded: TraderBot Alpha", time: "10:00:00.125" },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[4px] bg-[rgb(var(--accent-green))]/10 border border-[rgb(var(--accent-green))]/30 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-[rgb(var(--accent-green))]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] tracking-tight">
              AGENT SIMULATOR
            </h1>
            <p className="text-xs text-[rgb(var(--text-muted))] tracking-wide">
              Write and execute agent behavior scripts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isRunning ? (
            <Button variant="danger" onClick={handleStop} className="gap-2">
              <Square className="w-4 h-4" /> STOP
            </Button>
          ) : (
            <Button onClick={handleRun} className="gap-2">
              <Play className="w-4 h-4" /> RUN SCRIPT
            </Button>
          )}
          <Button variant="secondary" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" /> RESET
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-4 p-3 rounded-[4px] bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-subtle))] animate-slide-up delay-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-[rgb(var(--accent-green))] animate-pulse" : "bg-[rgb(var(--text-muted))]"}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-muted))]">
            {isRunning ? "RUNNING" : "IDLE"}
          </span>
        </div>
        <div className="h-4 w-px bg-[rgb(var(--border-subtle))]" />
        <div className="flex items-center gap-2">
          <Bot className="w-3 h-3 text-[rgb(var(--accent-cyan))]" />
          <span className="text-[10px] text-[rgb(var(--text-secondary))]">Agent: TraderBot Alpha</span>
        </div>
        <div className="h-4 w-px bg-[rgb(var(--border-subtle))]" />
        <div className="flex items-center gap-2">
          <Code className="w-3 h-3 text-[rgb(var(--accent-purple))]" />
          <span className="text-[10px] text-[rgb(var(--text-secondary))]">{script.split("\n").length} lines</span>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Editor */}
        <div className="animate-slide-up delay-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[4px] bg-[rgb(var(--accent-purple))]/10 border border-[rgb(var(--accent-purple))]/30 flex items-center justify-center">
                  <Code className="w-4 h-4 text-[rgb(var(--accent-purple))]" />
                </div>
                SCRIPT EDITOR
              </CardTitle>
              <CardDescription>
                Write simulation scripts using the agent API
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="w-full h-[500px] p-4 font-mono text-xs bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] rounded-none border-0 resize-none focus:outline-none focus:ring-1 focus:ring-[rgb(var(--accent-cyan))]/30 leading-relaxed"
                spellCheck={false}
              />
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="animate-slide-up delay-3">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[4px] bg-[rgb(var(--accent-cyan))]/10 border border-[rgb(var(--accent-cyan))]/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[rgb(var(--accent-cyan))]" />
                </div>
                OUTPUT
              </CardTitle>
              <CardDescription>
                Simulation logs and execution results
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] overflow-y-auto p-4 bg-[rgb(var(--bg-primary))] font-mono text-xs">
                {logs.map((log, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-3 py-1 ${
                      log.type === "error" ? "text-[rgb(var(--accent-red))]" :
                      log.type === "agent" ? "text-[rgb(var(--accent-cyan))]" :
                      "text-[rgb(var(--text-muted))]"
                    }`}
                  >
                    <span className="text-[rgb(var(--text-muted))]/50 shrink-0">
                      [{log.time}]
                    </span>
                    {log.type === "error" ? (
                      <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    ) : log.type === "agent" ? (
                      <Bot className="w-3 h-3 shrink-0 mt-0.5" />
                    ) : (
                      <Terminal className="w-3 h-3 shrink-0 mt-0.5" />
                    )}
                    <span>{log.message}</span>
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 text-[rgb(var(--accent-green))] py-1">
                    <span className="text-[rgb(var(--text-muted))]/50">[{new Date().toLocaleTimeString()}]</span>
                    <span className="animate-pulse">_</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
