import { ethers } from 'ethers';
import { create } from 'zustand';
import { TOKENS_DATA, WALLETS_DATA } from '@constants';
import { IToken, IWallet } from '@types';
import { Networks, WalletStoreModel } from './wallets.types';

/**
 * Wallet store for managing wallet data
 */
export const useWalletStore = create<WalletStoreModel>((set, get) => {
  // Initial values
  const initialSelectedWallet = WALLETS_DATA[0];
  const initialSelectedTokens = TOKENS_DATA.filter(
    (token) => token.walletAddress === initialSelectedWallet.address
  );

  return {
    // State
    network: Networks.ascendia,
    wallets: WALLETS_DATA,
    selectedWallet: initialSelectedWallet,
    selectedWalletTokens: initialSelectedTokens,

    // Getters
    getWallets: () => get().wallets,

    getWalletByAddress: (address: string) => {
      return get().wallets.find((wallet) => wallet.address === address);
    },

    /**
     * Get tokens for a wallet by its address
     * @param walletAddress Wallet address
     * @returns Array of tokens or empty array if wallet not found
     */
    getTokensByWalletAddress: (walletAddress: string) => {
      return TOKENS_DATA.filter(
        (token) => token.walletAddress === walletAddress
      );
    },

    /**
     * Calculate total USD balance for given tokens
     * @param tokens Array of tokens
     * @returns Total USD balance
     */
    calculateTotalUsdBalance: (tokens: IToken[]): number => {
      if (!tokens || !tokens.length) return 0;

      return tokens.reduce(
        (total, token) => total + parseFloat(token.usdBalance),
        0
      );
    },

    formatTokenBalance: (token: IToken) => {
      // Use ethers.js formatUnits to correctly convert from wei to token units based on decimals
      return ethers.utils.formatUnits(token.balance, token.decimals);
    },

    changeSelectedWallet: (wallet: IWallet) => {
      const selectedTokens = TOKENS_DATA.filter(
        (token) => token.walletAddress === wallet.address
      );

      set({
        selectedWallet: wallet,
        selectedWalletTokens: selectedTokens
      });
    },

    // Actions
    initializeWallets: async () => {
      const selectedTokens = TOKENS_DATA.filter(
        (token) => token.walletAddress === initialSelectedWallet.address
      );

      set({
        wallets: WALLETS_DATA,
        selectedWallet: initialSelectedWallet,
        selectedWalletTokens: selectedTokens
      });
    },

    /**
     * Refresh wallet balance by its address
     * @param walletAddress Wallet address
     */
    refreshWalletBalance: async (walletAddress: string) => {
      // Simulation of backend API request to get wallet data
      const _WALLETS_DATA = WALLETS_DATA;
      const _wallet = _WALLETS_DATA.find((w) => w.address === walletAddress);

      if (_wallet) {
        const walletTokens = TOKENS_DATA.filter(
          (token) => token.walletAddress === walletAddress
        );

        set({
          wallets: _WALLETS_DATA,
          selectedWalletTokens: walletTokens
        });
      }
    }
  };
});
