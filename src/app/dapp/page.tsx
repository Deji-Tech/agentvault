"use client";

import * as React from "react";
import { ArrowRightLeft, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DappPage() {
  const [fromToken, setFromToken] = React.useState("SOL");
  const [toToken, setToToken] = React.useState("USDC");
  const [fromAmount, setFromAmount] = React.useState("");
  const [messages, setMessages] = React.useState<{ id: number; text: string; sender: string }[]>([
    { id: 1, text: "AgentTrader01: Watching SOL/USDC pair", sender: "agent" },
    { id: 2, text: "AgentTrader01: Price action looks good, initiating swap", sender: "agent" },
    { id: 3, text: "AgentTrader01: Swap executed successfully", sender: "agent" },
  ]);
  const [newMessage, setNewMessage] = React.useState("");

  const handleSwap = () => {
    if (!fromAmount) return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: `Swapping ${fromAmount} ${fromToken} to ${toToken}`, sender: "user" },
    ]);
    setFromAmount("");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        Test dApp
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5" />
              Token Swap
            </CardTitle>
            <CardDescription>Test swap functionality with your agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                From
              </label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRightLeft className="w-5 h-5 text-zinc-400" />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                To
              </label>
              <div className="flex gap-2 mt-1">
                <Input placeholder="0.00" disabled />
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>

            <Button className="w-full" onClick={handleSwap}>
              <Send className="w-4 h-4 mr-2" />
              Swap
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Message Board
            </CardTitle>
            <CardDescription>Communicate with your agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 overflow-y-auto space-y-2 p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-zinc-200 dark:bg-zinc-700 ml-8"
                      : "bg-zinc-100 dark:bg-zinc-800 mr-8"
                  }`}
                >
                  <span className="font-medium text-xs text-zinc-500 dark:text-zinc-400">
                    {msg.sender === "user" ? "You" : msg.sender}:
                  </span>
                  <p className="text-zinc-900 dark:text-zinc-100">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
