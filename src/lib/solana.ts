import { Connection, PublicKey, Keypair, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';

const DEFAULT_ENDPOINT = 'https://api.devnet.solana.com';

export interface BalanceResult {
  lamports: number;
  sol: number;
}

export interface SignatureResult {
  signature: string;
  blockTime?: number;
  confirmationStatus?: string;
}

export async function getBalance(
  publicKey: string,
  endpoint: string = DEFAULT_ENDPOINT
): Promise<BalanceResult> {
  const connection = new Connection(endpoint);
  const pubkey = new PublicKey(publicKey);
  const lamports = await connection.getBalance(pubkey);
  return {
    lamports,
    sol: lamports / 1e9,
  };
}

export async function getTokenAccounts(
  publicKey: string,
  endpoint: string = DEFAULT_ENDPOINT
) {
  const connection = new Connection(endpoint);
  const pubkey = new PublicKey(publicKey);
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
    programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
  });
  return tokenAccounts.value;
}

export async function getSignatures(
  publicKey: string,
  limit: number = 10,
  endpoint: string = DEFAULT_ENDPOINT
): Promise<SignatureResult[]> {
  const connection = new Connection(endpoint);
  const pubkey = new PublicKey(publicKey);
  const signatures = await connection.getSignaturesForAddress(pubkey, { limit });
  return signatures.map((sig) => ({
    signature: sig.signature,
    blockTime: sig.blockTime ?? undefined,
    confirmationStatus: sig.confirmationStatus,
  }));
}

export async function airdrop(
  publicKey: string,
  amount: number = 1,
  endpoint: string = DEFAULT_ENDPOINT
): Promise<string> {
  const connection = new Connection(endpoint);
  const pubkey = new PublicKey(publicKey);
  const signature = await connection.requestAirdrop(pubkey, amount * 1e9);
  
  await connection.confirmTransaction(signature);
  return signature;
}

export function generateKeypairFromHex(hexKey: string): Keypair {
  const buffer = Buffer.from(hexKey.replace(/^0x/, ''), 'hex');
  return Keypair.fromSeed(buffer.slice(0, 32));
}

export function generateKeypair(): { publicKey: string; privateKeyHex: string } {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKeyHex: Buffer.from(keypair.secretKey).toString('hex'),
  };
}

export async function sendTransaction(
  privateKeyHex: string,
  to: string,
  amount: number,
  endpoint: string = DEFAULT_ENDPOINT
): Promise<string> {
  const connection = new Connection(endpoint);
  const keypair = generateKeypairFromHex(privateKeyHex);
  const toPubkey = new PublicKey(to);

  const transferInstruction = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey,
    lamports: Math.floor(amount * 1e9),
  });

  const transaction = new Transaction().add(transferInstruction);

  const signature = await connection.sendTransaction(transaction, [keypair]);
  await connection.confirmTransaction(signature);
  return signature;
}
