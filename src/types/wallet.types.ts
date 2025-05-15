/**
 * Type definitions for wallet and token data structures
 */

/**
 * Token information
 */
export interface IToken {
  /** Unique identifier for the token */
  id: string;
  /** Contract address of the token */
  address: string;
  /** Display name of the token */
  name: string;
  /** Currency code/symbol of the token */
  currencyCode: string;
  /** Balance in smallest units (wei) as a string to preserve precision */
  balance: string;
  /** Number of decimals for the token (usually 18) */
  decimals: number;
  /** Whether the wallet has a native token */
  isNativeToken: boolean;

  /** Whether this is the main token for the wallet */
  isMain: number;
  /** USD value of the token balance */
  usdBalance: string;
  /** Wallet address this token belongs to */
  walletAddress: string;
}

/**
 * Wallet information
 */
export interface IWallet {
  /** Unique identifier for the wallet */
  id: string;
  /** Display name of the wallet */
  name: string;
  /** Unique hash for the wallet */
  hash: string;
  /** Wallet address */
  address: string;
}
