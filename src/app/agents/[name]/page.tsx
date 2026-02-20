"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Play, Square, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAgents, mockTransactions } from "@/lib/mock-data";

export default function AgentDetailPage() {
  const params = useParams();
  const name = params.name as string;
  const agent = mockAgents.find((a) => a.name === name);
  const transactions = mockTransactions.filter((t) => t.agentId === agent?.id);

  if (!agent) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Agent not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {agent.name}
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            {agent.status === "running" ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pubkey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Chip value={agent.pubkey} className="text-xs" />
              <Button variant="ghost" className="h-6 w-6 p-0">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{agent.solBalance} SOL</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={agent.status === "running" ? "success" : "muted"}>
              {agent.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Vaults</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{agent.vaultCount}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="vault">Vault</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400">No transactions yet</p>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
                    >
                      <div>
                        <p className="font-medium text-sm">{tx.type}</p>
                        <p className="text-xs text-zinc-500 font-mono">{tx.signature.slice(0, 16)}...</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={tx.status === "confirmed" ? "success" : "warning"}>
                          {tx.status}
                        </Badge>
                        <p className="text-xs text-zinc-500 mt-1">
                          {new Date(tx.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle>Token Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">No tokens held</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vault">
          <Card>
            <CardHeader>
              <CardTitle>Vault Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">No vault configured</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy">
          <Card>
            <CardHeader>
              <CardTitle>Policy Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">No policies configured</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">No manual actions available</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
