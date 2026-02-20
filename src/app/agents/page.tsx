"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Eye, Play, Square } from "lucide-react";
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

export default function AgentsPage() {
  const [agents, setAgents] = React.useState(mockAgents);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newAgentName, setNewAgentName] = React.useState("");

  const handleCreateAgent = () => {
    if (!newAgentName.trim()) return;
    const keypair = generateKeypair();
    const newAgent = {
      id: String(agents.length + 1),
      name: newAgentName,
      pubkey: keypair.pubkey,
      status: "idle" as const,
      solBalance: 0,
      vaultCount: 0,
      createdAt: new Date().toISOString(),
    };
    setAgents([...agents, newAgent]);
    setNewAgentName("");
    setIsDialogOpen(false);
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Agents
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
              <DialogDescription>
                Enter a name for your new autonomous agent.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Agent name"
                value={newAgentName}
                onChange={(e) => setNewAgentName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateAgent()}
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAgent}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Pubkey</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SOL Balance</TableHead>
              <TableHead>Vaults</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>
                  <Chip value={agent.pubkey} />
                </TableCell>
                <TableCell>
                  <Badge variant={agent.status === "running" ? "success" : "muted"}>
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell>{agent.solBalance} SOL</TableCell>
                <TableCell>{agent.vaultCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/agents/${agent.name}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAgentStatus(agent.id)}
                    >
                      {agent.status === "running" ? (
                        <>
                          <Square className="w-4 h-4 mr-1" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </>
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
