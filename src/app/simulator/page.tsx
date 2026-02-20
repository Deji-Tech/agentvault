"use client";

import * as React from "react";
import { Play, Square, RotateCcw, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}`;

export default function SimulatorPage() {
  const [script, setScript] = React.useState(defaultScript);
  const [isRunning, setIsRunning] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([
    "[System] Simulator initialized",
    "[System] Agent loaded: TraderBot Alpha",
  ]);

  const handleRun = () => {
    setIsRunning(true);
    setLogs([...logs, "[System] Starting simulation..."]);
    
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[Agent] Current balance: 2.5 SOL",
        "[Agent] Executing swap...",
        "[Agent] Swap executed: 1.25 SOL → 1250 USDC",
        "[Agent] Market analysis complete",
        "[System] Simulation completed",
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs((prev) => [...prev, "[System] Simulation stopped"]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setScript(defaultScript);
    setLogs(["[System] Simulator initialized", "[System] Agent loaded: TraderBot Alpha"]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Agent Simulator
        </h1>
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button variant="danger" onClick={handleStop}>
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button onClick={handleRun}>
              <Play className="w-4 h-4 mr-2" />
              Run
            </Button>
          )}
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Script Editor
            </CardTitle>
            <CardDescription>Write simulation scripts for your agents</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm bg-zinc-900 text-zinc-100 rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Simulation logs and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 overflow-y-auto p-4 bg-zinc-900 rounded-lg font-mono text-sm">
              {logs.map((log, i) => (
                <div key={i} className="text-zinc-300">
                  {log}
                </div>
              ))}
              {isRunning && (
                <div className="text-zinc-500 animate-pulse">_</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
