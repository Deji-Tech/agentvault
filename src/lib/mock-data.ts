import { Agent, Transaction } from "./types"

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "TraderBot Alpha",
    pubkey: "7xKXtg2CW87d3HEQ2BpKHpcPKBhpKGQPPRQJyccVLow9",
    status: "running",
    solBalance: 2.5,
    vaultCount: 3,
    createdAt: "2025-02-15T10:30:00Z",
  },
  {
    id: "2",
    name: "LiquidityAgent",
    pubkey: "9QzsJf7LPLj8GkXbYT3LFDKqsj2hHG7TA3xinJHu8epQ",
    status: "idle",
    solBalance: 5.0,
    vaultCount: 1,
    createdAt: "2025-02-16T14:20:00Z",
  },
  {
    id: "3",
    name: "MessagePoster",
    pubkey: "3Z1Ef7YaxK8oUMoi6exf7wYZjZKWJJsrzJXSt1c3qrDE",
    status: "running",
    solBalance: 0.5,
    vaultCount: 0,
    createdAt: "2025-02-18T09:15:00Z",
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    agentId: "1",
    signature: "41hmwmkMfHR5mmhG9sNkjiakwHxpmr1H3Gi3bBL8v5PbsRrH7FhpUT8acHaf2mrPKNVD894dSYXfjp6LfAbVpcCE",
    type: "sol_transfer",
    amount: 1000000000,
    to: "CxELquR1gPP8wHe33gZ4QxqGB3sZ9RSwsJ2KshVewkFY",
    status: "confirmed",
    createdAt: "2025-02-18T15:30:00Z",
  },
  {
    id: "2",
    agentId: "1",
    signature: "5ZQqsF4tTFJDR5vuNJxejtw2GMc8KEtnPXnQjwhGzAtdbPTKtrLfPkFAbBTyPjZSVB3CbR5BiP5S8zAfZNtuwh88",
    type: "swap",
    amount: 500000000,
    status: "confirmed",
    createdAt: "2025-02-18T14:45:00Z",
  },
  {
    id: "3",
    agentId: "2",
    signature: "2nBhEBYYvfaAe16UMNqRHre4YNSskvuYgx3M6E4JP1oDYvZEJHvoPzyUidNgNX5r9sTyN1J9UxtbCXy2rqYcuyuv",
    type: "spl_transfer",
    amount: 1000000,
    token: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    to: "D1UPrG5kHPhEvwAoYpFymQkHsNNzx8jWooeAvKiPfgFQ",
    status: "confirmed",
    createdAt: "2025-02-18T12:20:00Z",
  },
  {
    id: "4",
    agentId: "3",
    signature: "3Eq21vXNB5s86c62bVuUfTeaMif1N2kUqRPBmGRJhyTA",
    type: "message",
    amount: 0,
    status: "confirmed",
    createdAt: "2025-02-18T11:00:00Z",
  },
]

export function generateKeypair(): { pubkey: string; privkey: string } {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let pubkey = ""
  let privkey = ""
  for (let i = 0; i < 44; i++) {
    pubkey += chars[Math.floor(Math.random() * chars.length)]
  }
  for (let i = 0; i < 88; i++) {
    privkey += chars[Math.floor(Math.random() * chars.length)]
  }
  return { pubkey, privkey }
}

export function generateSignature(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let sig = ""
  for (let i = 0; i < 88; i++) {
    sig += chars[Math.floor(Math.random() * chars.length)]
  }
  return sig
}
