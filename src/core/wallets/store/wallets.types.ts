import { IToken, IWallet } from '../../../types';

export enum Networks {
  ascendia = 'ascendia',
  ethereum = 'ethereum',
  bsc = 'bsc',
  solana = 'solana',
  base = 'base'
}

/**
 * Interface for wallet store state
 */
export interface WalletStoreModel {
  // State
  wallets: IWallet[];
  network: Networks;
  selectedWallet: IWallet | null;
  selectedWalletTokens: IToken[];

  // Getters
  getWallets: () => IWallet[];
  getWalletByAddress: (address: string) => IWallet | undefined;
  getTokensByWalletAddress: (walletAddress: string) => IToken[];
  calculateTotalUsdBalance: (tokens: IToken[]) => number;

  // Helpers
  formatTokenBalance: (token: IToken) => string;
  changeSelectedWallet: (wallet: IWallet | null) => void;

  // Actions
  initializeWallets: () => Promise<void>;
  refreshWalletBalance: (walletAddress: string) => Promise<void>;
  updateWalletName: (walletId: string, newName: string) => void;
  removeWallet: (walletId: string) => void;
}
