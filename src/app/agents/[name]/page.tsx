"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Play, Square, Copy, ExternalLink, 
  Plus, Send, RefreshCw, Shield, Activity, 
  Lock, Coins, Settings, Wallet
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAgents, mockTransactions, generateSignature } from "@/lib/mock-data";
import { Agent, Transaction } from "@/lib/types";

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;
  
  const [agent, setAgent] = React.useState<Agent | undefined>(
    mockAgents.find((a) => a.name === name)
  );
  const [transactions, setTransactions] = React.useState<Transaction[]>(
    mockTransactions.filter((t) => t.agentId === agent?.id)
  );
  const [sendAmount, setSendAmount] = React.useState("");
  const [sendTo, setSendTo] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-[4px] bg-[rgb(var(--accent-red))]/10 border border-[rgb(var(--accent-red))]/30 flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-[rgb(var(--accent-red))]" />
        </div>
        <h2 className="text-lg font-bold text-[rgb(var(--text-primary))] mb-2">AGENT NOT FOUND</h2>
        <p className="text-xs text-[rgb(var(--text-muted))] mb-6">The requested agent does not exist</p>
        <Link href="/agents">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO AGENTS
          </Button>
        </Link>
      </div>
    );
  }

  const handleCopyPubkey = async () => {
    await navigator.clipboard.writeText(agent.pubkey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStatus = () => {
    setAgent({
      ...agent,
      status: agent.status === "running" ? "idle" : "running",
    });
  };

  const handleSendSol = () => {
    if (!sendAmount || !sendTo) return;
    
    const newTx: Transaction = {
      id: String(transactions.length + 1),
      agentId: agent.id,
      signature: generateSignature(),
      type: "sol_transfer",
      amount: parseFloat(sendAmount) * 1e9,
      to: sendTo,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    setTransactions([newTx, ...transactions]);
    setSendAmount("");
    setSendTo("");
  };

  const getTxType = (type: string) => {
    switch (type) {
      case "sol_transfer": return "SOL TRANSFER";
      case "spl_transfer": return "SPL TRANSFER";
      case "swap": return "TOKEN SWAP";
      case "message": return "MESSAGE";
      default: return type.toUpperCase();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div className="flex items-center gap-4">
          <Link href="/agents">
            <Button variant="ghost" size="icon" className="border border-[rgb(var(--border-subtle))">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-[4px] flex items-center justify-center ${
              agent.status === "running" 
                ? "bg-[rgb(var(--accent-green))]/10 border border-[rgb(var(--accent-green))]/30" 
                : "bg-[rgb(var(--bg-tertiary)] border border-[rgb(var(--border-subtle))]"
            }`}>
              <Wallet className={`w-5 h-5 ${
                agent.status === "running" ? "text-[rgb(var(--accent-green))]" : "text-[rgb(var(--text-muted))]"
              }`} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[rgb(var(--text-primary)] tracking-tight">
                {agent.name}
              </h1>
              <p className="text-[10px] text-[rgb(var(--text-muted))] tracking-wide">
                AUTONOMOUS AGENT WALLET
              </p>
            </div>
          </div>
        </div>
        
        <Button
          variant={agent.status === "running" ? "danger" : "success"}
          onClick={toggleStatus}
          className="gap-2"
        >
          {agent.status === "running" ? (
            <><Square className="w-4 h-4" /> STOP AGENT</>
          ) : (
            <><Play className="w-4 h-4" /> START AGENT</>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-slide-up delay-1">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Wallet className="w-3 h-3" /> PUBKEY
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Chip value={agent.pubkey} className="text-[10px]" full />
                <Button variant="ghost" size="icon" onClick={handleCopyPubkey}>
                  {copied ? (
                    <span className="text-[10px] text-[rgb(var(--accent-green))]">OK</span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-slide-up delay-2">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Activity className="w-3 h-3" /> SOL BALANCE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[rgb(var(--accent-cyan))]">
                {agent.solBalance.toFixed(4)}
                <span className="text-xs text-[rgb(var(--text-muted))] ml-1">SOL</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="animate-slide-up delay-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Lock className="w-3 h-3" /> STATUS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={agent.status === "running" ? "success" : "muted"}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  agent.status === "running" ? "bg-[rgb(var(--accent-green))] animate-pulse" : "bg-[rgb(var(--text-muted))]"
                }`} />
                {agent.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="animate-slide-up delay-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Coins className="w-3 h-3" /> VAULT COUNT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[rgb(var(--accent-amber))]">
                {agent.vaultCount}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 animate-slide-up delay-5">
        <Button variant="secondary" size="sm" className="gap-2">
          <Plus className="w-3 h-3" /> AIRDROP
        </Button>
        <Button variant="secondary" size="sm" className="gap-2">
          <RefreshCw className="w-3 h-3" /> REFRESH
        </Button>
        <Button variant="secondary" size="sm" className="gap-2">
          <Shield className="w-3 h-3" /> POLICY
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activity" className="animate-slide-up delay-6">
        <TabsList className="grid grid-cols-5 w-full max-w-xl">
          <TabsTrigger value="activity">ACTIVITY</TabsTrigger>
          <TabsTrigger value="tokens">TOKENS</TabsTrigger>
          <TabsTrigger value="vault">VAULT</TabsTrigger>
          <TabsTrigger value="policy">POLICY</TabsTrigger>
          <TabsTrigger value="manual">MANUAL</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[rgb(var(--accent-cyan))" />
                TRANSACTION HISTORY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[rgb(var(--border-subtle))">
                    <TableHead className="text-[10px] uppercase">TYPE</TableHead>
                    <TableHead className="text-[10px] uppercase">SIGNATURE</TableHead>
                    <TableHead className="text-[10px] uppercase text-right">AMOUNT</TableHead>
                    <TableHead className="text-[10px] uppercase">STATUS</TableHead>
                    <TableHead className="text-[10px] uppercase">TIME</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-[rgb(var(--text-muted))] text-xs">NO TRANSACTIONS YET</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((tx) => (
                      <TableRow key={tx.id} className="border-b border-[rgb(var(--border-subtle))/50">
                        <TableCell>
                          <Badge variant="default">{getTxType(tx.type)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Chip value={tx.signature} className="text-[10px]" />
                        </TableCell>
                        <TableCell className="text-right font-mono text-[rgb(var(--text-secondary))]">
                          {tx.amount > 0 ? (tx.amount / 1e9).toFixed(4) : "-"} SOL
                        </TableCell>
                        <TableCell>
                          <Badge variant={tx.status === "confirmed" ? "success" : tx.status === "failed" ? "danger" : "warning"}>
                            {tx.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[10px] text-[rgb(var(--text-muted))]">
                          {new Date(tx.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[rgb(var(--accent-purple))" />
                SPL TOKEN ACCOUNTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-[rgb(var(--text-muted))] text-xs mb-4">NO TOKEN ACCOUNTS FOUND</p>
                <Button variant="secondary" size="sm">
                  <Plus className="w-3 h-3 mr-2" /> CREATE TOKEN ACCOUNT
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vault" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[rgb(var(--accent-amber))" />
                VAULT RECORDS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))]">
                <p className="text-[10px] text-[rgb(var(--text-muted))] mb-3">RECORD A MESSAGE</p>
                <div className="flex gap-2">
                  <Input placeholder="Enter your secure message..." className="flex-1 font-mono text-xs" />
                  <Button size="sm">
                    <Send className="w-3 h-3 mr-2" /> RECORD
                  </Button>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-[rgb(var(--text-muted))] text-xs">NO VAULT RECORDS YET</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[rgb(var(--accent-green))" />
                AGENT POLICY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-[rgb(var(--text-muted))]">MAX SPEND (SOL)</label>
                  <Input type="number" placeholder="1.0" defaultValue="1.0" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-[rgb(var(--text-muted))]">ALLOWLIST COUNT</label>
                  <Input placeholder="0 addresses" defaultValue="0" />
                </div>
              </div>
              <Button className="w-full">
                <Shield className="w-3 h-3 mr-2" /> SAVE POLICY
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[rgb(var(--accent-pink))" />
                MANUAL TRANSFER
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-[rgb(var(--text-muted))]">RECIPIENT ADDRESS</label>
                <Input 
                  placeholder="Solana address" 
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  className="font-mono text-xs" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-[rgb(var(--text-muted))]">AMOUNT (SOL)</label>
                <Input 
                  type="number" 
                  placeholder="0.0" 
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleSendSol} className="w-full gap-2">
                <Send className="w-4 h-4" /> SEND SOL
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
