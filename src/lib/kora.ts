export interface KoraConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface GaslessTransaction {
  from: string;
  to: string;
  data?: string;
  value?: string;
}

export interface KoraResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export class KoraClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: KoraConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.kora.ai/v1';
  }

  async sendGaslessTransaction(
    transaction: GaslessTransaction
  ): Promise<KoraResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions/gasless`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Transaction failed',
        };
      }

      const data = await response.json();
      return {
        success: true,
        transactionId: data.transactionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getTransactionStatus(transactionId: string): Promise<KoraResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/transactions/${transactionId}/status`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to get status',
        };
      }

      const data = await response.json();
      return {
        success: true,
        transactionId: data.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export function createKoraClient(apiKey: string): KoraClient {
  return new KoraClient({ apiKey });
}
