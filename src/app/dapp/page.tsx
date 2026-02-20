"use client";

import * as React from "react";
import { ArrowRightLeft, Send, MessageSquare, Zap, Bot, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function DappPage() {
  const [fromToken, setFromToken] = React.useState("SOL");
  const [toToken, setToToken] = React.useState("USDC");
  const [fromAmount, setFromAmount] = React.useState("");
  const [isSwapping, setIsSwapping] = React.useState(false);
  const [messages, setMessages] = React.useState<{ id: number; text: string; sender: string; time: string }[]>([
    { id: 1, text: "System initialized. Monitoring SOL/USDC pair...", sender: "system", time: "10:00:00" },
    { id: 2, text: "Price action detected: +2.3% in last hour", sender: "AgentTrader01", time: "10:15:32" },
    { id: 3, text: "Executing buy order at current market price", sender: "AgentTrader01", time: "10:16:01" },
    { id: 4, text: "Order filled: 10.5 SOL → 1,247.32 USDC", sender: "AgentTrader01", time: "10:16:15" },
  ]);
  const [newMessage, setNewMessage] = React.useState("");

  const handleSwap = () => {
    if (!fromAmount) return;
    setIsSwapping(true);
    
    setTimeout(() => {
      setMessages([
        ...messages,
        { 
          id: messages.length + 1, 
          text: `Executing swap: ${fromAmount} ${fromToken} → ${toToken}`, 
          sender: "you", 
          time: new Date().toLocaleTimeString() 
        },
        { 
          id: messages.length + 2, 
          text: `Swap completed successfully`, 
          sender: "system", 
          time: new Date().toLocaleTimeString() 
        },
      ]);
      setFromAmount("");
      setIsSwapping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { 
      id: messages.length + 1, 
      text: newMessage, 
      sender: "you", 
      time: new Date().toLocaleTimeString() 
    }]);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[4px] bg-[rgb(var(--accent-purple))]/10 border border-[rgb(var(--accent-purple))]/30 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-[rgb(var(--accent-purple))]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] tracking-tight">
              TEST dAPP
            </h1>
            <p className="text-xs text-[rgb(var(--text-muted))] tracking-wide">
              Simulate agent interactions with token swaps and messaging
            </p>
          </div>
        </div>
      </div>

      {/* Token Swap Card */}
      <div className="animate-slide-up delay-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[4px] bg-[rgb(var(--accent-cyan))]/10 border border-[rgb(var(--accent-cyan))]/30 flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4 text-[rgb(var(--accent-cyan))]" />
              </div>
              TOKEN SWAP
            </CardTitle>
            <CardDescription>
              Simulate token swap transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-[rgb(var(--text-muted))] tracking-wider">
                From
              </label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 font-mono text-lg"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="h-12 px-4 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-default))] text-sm font-bold text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-cyan))]"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="BONK">BONK</option>
                </select>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))] flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4 text-[rgb(var(--text-muted))]" />
              </div>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-[rgb(var(--text-muted))] tracking-wider">
                To (Estimated)
              </label>
              <div className="flex gap-3">
                <Input
                  placeholder="0.00"
                  disabled
                  className="flex-1 font-mono text-lg bg-[rgb(var(--bg-tertiary))/50]"
                />
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="h-12 px-4 rounded-[4px] bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-default))] text-sm font-bold text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-cyan))]"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="BONK">BONK</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleSwap} 
              disabled={!fromAmount || isSwapping}
              className="w-full gap-2"
            >
              {isSwapping ? (
                <>
                  <Zap className="w-4 h-4 animate-pulse" />
                  SWAPPING...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  EXECUTE SWAP
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Message Board Card */}
      <div className="animate-slide-up delay-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[4px] bg-[rgb(var(--accent-pink))]/10 border border-[rgb(var(--accent-pink))]/30 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[rgb(var(--accent-pink))]" />
              </div>
              AGENT MESSAGE BOARD
            </CardTitle>
            <CardDescription>
              Chat with your autonomous agents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="h-80 overflow-y-auto space-y-3 p-4 rounded-[4px] bg-[rgb(var(--bg-primary))] border border-[rgb(var(--border-subtle))]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "you" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender !== "you" && (
                      <Bot className="w-3 h-3 text-[rgb(var(--accent-cyan))]" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-muted))]">
                      {msg.sender}
                    </span>
                    <span className="text-[9px] text-[rgb(var(--text-muted))]">
                      {msg.time}
                    </span>
                  </div>
                  <div className={`max-w-[85%] p-3 rounded-[4px] text-xs ${
                    msg.sender === "you" 
                      ? "bg-[rgb(var(--accent-cyan))]/10 border border-[rgb(var(--accent-cyan))]/30" 
                      : msg.sender === "system"
                      ? "bg-[rgb(var(--accent-amber))]/10 border border-[rgb(var(--accent-amber))]/30"
                      : "bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-subtle))]"
                  }`}>
                    <p className="text-[rgb(var(--text-primary))]">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <Input
                placeholder="Type a message to your agent..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
