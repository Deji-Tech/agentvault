"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Eye, Play, Square, Bot, Terminal, Zap, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mockAgents, generateKeypair } from "@/lib/mock-data";
import { Agent } from "@/lib/types";

export default function AgentsPage() {
  const [agents, setAgents] = React.useState(mockAgents);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newAgentName, setNewAgentName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const handleCreateAgent = () => {
    if (!newAgentName.trim()) return;
    setIsCreating(true);
    
    setTimeout(() => {
      const keypair = generateKeypair();
      const newAgent: Agent = {
        id: String(agents.length + 1),
        name: newAgentName,
        pubkey: keypair.pubkey,
        status: "idle",
        solBalance: 0,
        vaultCount: 0,
        createdAt: new Date().toISOString(),
      };
      setAgents([...agents, newAgent]);
      setNewAgentName("");
      setIsDialogOpen(false);
      setIsCreating(false);
    }, 800);
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? { ...agent, status: agent.status === "running" ? "idle" : "running" }
          : agent
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-end justify-between animate-slide-up">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-[rgb(var(--accent-cyan))]/10 border border-[rgb(var(--accent-cyan))]/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[rgb(var(--accent-cyan))]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))]">
              AGENTS
            </h1>
          </div>
          <p className="text-xs text-[rgb(var(--text-muted))] tracking-wide">
            Autonomous AI wallets managing your Solana vaults
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              NEW AGENT
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border-default))]">
            <DialogHeader>
              <DialogTitle className="text-[rgb(var(--text-primary))] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[rgb(var(--accent-cyan))]" />
                CREATE NEW AGENT
              </DialogTitle>
              <DialogDescription className="text-[rgb(var(--text-muted))]">
                Deploy a new autonomous agent wallet on Solana devnet.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-[rgb(var(--text-secondary))] uppercase">
                  Agent Name
                </label>
                <Input
                  placeholder="e.g., TraderBot Alpha"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateAgent()}
                  className="font-mono"
                />
              </div>
              <div className="p-3 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))]">
                <p className="text-[10px] text-[rgb(var(--text-muted))]">
                  <span className="text-[rgb(var(--accent-amber))]">NOTE:</span> A new Solana keypair will be generated on devnet. Store the private key securely.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="secondary" 
                onClick={() => setIsDialogOpen(false)}
                disabled={isCreating}
              >
                CANCEL
              </Button>
              <Button 
                onClick={handleCreateAgent}
                disabled={!newAgentName.trim() || isCreating}
                className={isCreating ? "animate-pulse" : ""}
              >
                {isCreating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    CREATING...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    CREATE AGENT
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "TOTAL AGENTS", value: agents.length, color: "cyan" },
          { label: "RUNNING", value: agents.filter(a => a.status === "running").length, color: "green" },
          { label: "IDLE", value: agents.filter(a => a.status === "idle").length, color: "muted" },
          { label: "TOTAL SOL", value: agents.reduce((acc, a) => acc + a.solBalance, 0).toFixed(2), color: "amber" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`animate-slide-up delay-${i + 1}`}
          >
            <div className="p-4 rounded-[4px] bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-subtle))]">
              <p className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${
                stat.color === "cyan" ? "text-[rgb(var(--accent-cyan))]" :
                stat.color === "green" ? "text-[rgb(var(--accent-green))]" :
                stat.color === "amber" ? "text-[rgb(var(--accent-amber))]" :
                "text-[rgb(var(--text-primary))]"
              }`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Agents Table */}
      <div className="rounded-[4px] bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-subtle))] overflow-hidden animate-slide-up delay-5">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--bg-tertiary))]/50">
              <TableHead className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] uppercase">NAME</TableHead>
              <TableHead className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] uppercase">PUBKEY</TableHead>
              <TableHead className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] uppercase">STATUS</TableHead>
              <TableHead className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] uppercase text-right">BALANCE</TableHead>
              <TableHead className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] uppercase text-right">VAULTS</TableHead>
              <TableHead className="text-[10px] font-bold tracking-wider text-[rgb(var(--text-muted))] uppercase">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent, idx) => (
              <TableRow 
                key={agent.id} 
                className="border-b border-[rgb(var(--border-subtle))]/50 hover:bg-[rgb(var(--bg-tertiary))]/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-[4px] flex items-center justify-center ${
                      agent.status === "running" 
                        ? "bg-[rgb(var(--accent-green))]/10 border border-[rgb(var(--accent-green))]/30" 
                        : "bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))]"
                    }`}>
                      <Bot className={`w-4 h-4 ${
                        agent.status === "running" ? "text-[rgb(var(--accent-green))]" : "text-[rgb(var(--text-muted))]"
                      }`} />
                    </div>
                    <span className="font-bold text-[rgb(var(--text-primary))]">{agent.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip value={agent.pubkey} />
                </TableCell>
                <TableCell>
                  <Badge variant={agent.status === "running" ? "success" : "muted"}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      agent.status === "running" ? "bg-[rgb(var(--accent-green))] animate-pulse" : "bg-[rgb(var(--text-muted))]"
                    }`} />
                    {agent.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-[rgb(var(--text-secondary))]">
                  {agent.solBalance.toFixed(4)} <span className="text-[rgb(var(--text-muted))]">SOL</span>
                </TableCell>
                <TableCell className="text-right font-mono text-[rgb(var(--text-secondary))]">
                  {agent.vaultCount}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/agents/${agent.name}`}>
                      <Button variant="ghost" size="sm" className="text-[10px] gap-1">
                        VIEW <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAgentStatus(agent.id)}
                      className={`text-[10px] gap-1 ${
                        agent.status === "running" 
                          ? "text-[rgb(var(--accent-red))]" 
                          : "text-[rgb(var(--accent-green))]"
                      }`}
                    >
                      {agent.status === "running" ? (
                        <><Square className="w-3 h-3" /> STOP</>
                      ) : (
                        <><Play className="w-3 h-3" /> START</>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
