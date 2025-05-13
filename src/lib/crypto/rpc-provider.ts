import { ethers } from 'ethers';
import { createPublicClient, http } from 'viem';
import { Config, MAINNET, TESTNET } from '@constants';

export const Chain = {
  16718: MAINNET,
  22040: TESTNET
};

export const CHAIN = Chain[Config.CHAIN_ID as keyof typeof Chain];

export const createRpcProvider = () => {
  return createPublicClient({
    chain: CHAIN,
    transport: http()
  });
};

// TODO: Remove this once we have a viem provider
export const createAMBProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    Config.NETWORK_URL,
    Config.CHAIN_ID
  );
};
