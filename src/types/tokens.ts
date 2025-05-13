export interface AppToken {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
}

export interface AppTokensEnvironment {
  PROD: AppToken[];
  TESTNET: AppToken[];
}
