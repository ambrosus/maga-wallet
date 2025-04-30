import { createPublicClient, http } from 'viem';
import { Config, MAINNET, TESTNET } from '@constants';

export const Chain = {
  16718: MAINNET,
  22040: TESTNET
};

export const createRpcProvider = () => {
  return createPublicClient({
    chain: Chain[Config.CHAIN_ID as keyof typeof Chain],
    transport: http()
  });
};
