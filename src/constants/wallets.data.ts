import { IWallet, IToken } from '../types';

export const TOKENS_DATA: IToken[] = [
  {
    id: '1',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT contract
    name: 'Tether USD',
    currencyCode: 'USDT',
    balance: '12500000000000000000000', // 12500 USDT
    isNativeToken: false,
    decimals: 18,
    isMain: 1,
    usdBalance: '125.12' // 1 USDT = 1 USD
  },
  {
    id: '2',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    address: '0x4dc3643dbc642b72c158e7f3d2ff232df61cb6ce', // AMB contract
    name: 'AirDAO',
    currencyCode: 'AMB',
    balance: '25000000000000000000000', // 25000 AMB
    isNativeToken: true,
    decimals: 18,
    isMain: 0,
    usdBalance: '5275.01' // Assuming price of 0.211 USD per AMB
  },
  {
    id: '3',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    address: '0x95a4492f028aa1fd432ea71146b433e7b4446611', // BOND token (AirDAO Bond)
    name: 'AirDAO Bond',
    currencyCode: 'BOND',
    balance: '7500000000000000000000', // 7500 BOND
    isNativeToken: false,
    decimals: 18,
    isMain: 0,
    usdBalance: '1500.12' // Assuming price of 0.2 USD per BOND
  },
  {
    id: '4',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC contract
    name: 'USD Coin',
    currencyCode: 'USDC',
    balance: '1750000000000000000000', // 1750 USDC
    isNativeToken: false,
    decimals: 18,
    isMain: 0,
    usdBalance: '1750.13' // 1 USDC = 1 USD
  },
  {
    id: '5',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', // VOTE token (AirDAO Governance)
    name: 'AirDAO Vote',
    currencyCode: 'VOTE',
    balance: '5000000000000000000000', // 5000 VOTE
    isNativeToken: false,
    decimals: 18,
    isMain: 0,
    usdBalance: '1000.74' // Assuming price of 0.2 USD per VOTE
  },
  {
    id: '1',
    walletAddress: '0x6789abcdef1234567890abcdef1234567890abcd',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC contract
    name: 'USD Coin',
    currencyCode: 'USDC',
    balance: '67500000000000000000000', // 67500 USDC
    isNativeToken: false,
    decimals: 18,
    isMain: 1,
    usdBalance: '67500.22' // 1 USDC = 1 USD
  },
  {
    id: '2',
    walletAddress: '0x6789abcdef1234567890abcdef1234567890abcd',
    address: '0x4dc3643dbc642b72c158e7f3d2ff232df61cb6ce', // AMB contract
    name: 'AirDAO',
    currencyCode: 'AMB',
    balance: '175000000000000000000000', // 175000 AMB
    isNativeToken: true,
    decimals: 18,
    isMain: 0,
    usdBalance: '36925.19' // Assuming price of 0.211 USD per AMB
  },
  {
    id: '3',
    walletAddress: '0x6789abcdef1234567890abcdef1234567890abcd',
    address: '0x95a4492f028aa1fd432ea71146b433e7b4446611', // BOND token (AirDAO Bond)
    name: 'AirDAO Bond',
    currencyCode: 'BOND',
    balance: '35000000000000000000000', // 35000 BOND
    isNativeToken: false,
    decimals: 18,
    isMain: 0,
    usdBalance: '7000.24' // Assuming price of 0.2 USD per BOND
  },
  {
    id: '4',
    walletAddress: '0x6789abcdef1234567890abcdef1234567890abcd',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT contract
    name: 'Tether USD',
    currencyCode: 'USDT',
    balance: '3600000000000000000000', // 3600 USDT
    isNativeToken: false,
    decimals: 18,
    isMain: 0,
    usdBalance: '3600.25' // 1 USDT = 1 USD
  },
  {
    id: '5',
    walletAddress: '0x6789abcdef1234567890abcdef1234567890abcd',
    address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', // VOTE token (AirDAO Governance)
    name: 'AirDAO Vote',
    currencyCode: 'VOTE',
    balance: '45000000000000000000000', // 45000 VOTE
    isNativeToken: false,
    decimals: 18,
    isMain: 0,
    usdBalance: '9000.25' // Assuming price of 0.2 USD per VOTE
  }
];

/**
 * Mock wallet data for development environment
 * Simulating database records
 */
export const WALLETS_DATA: IWallet[] = [
  {
    id: '1',
    name: 'Main Wallet',
    hash: 'a1b2c3d4e5f6g7h8i9j0',
    address: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '2',
    name: 'Savings Wallet',
    hash: 'k1l2m3n4o5p6q7r8s9t0',
    address: '0x6789abcdef1234567890abcdef1234567890abcd'
  }
];
