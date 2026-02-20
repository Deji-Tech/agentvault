export interface Agent {
  id: string;
  name: string;
  pubkey: string;
  status: "idle" | "running" | "stopped";
  solBalance: number;
  vaultCount: number;
  createdAt: string;
}

export interface AgentPolicy {
  maxSpendLamports: number;
  allowlist: string[];
}

export interface Transaction {
  id: string;
  agentId: string;
  signature: string;
  type: "sol_transfer" | "spl_transfer" | "swap" | "message";
  amount: number;
  token?: string;
  to?: string;
  status: "pending" | "confirmed" | "failed";
  createdAt: string;
}

export interface TokenAccount {
  mint: string;
  amount: number;
  decimals: number;
  uiAmount: number;
}
