import { ethers } from 'ethers';
// import { useRodeoTokensStore } from '@entities/amb-rodeo-tokens/model';
import { Config } from '@constants';
// import { transformTokensObject } from './transform-tokens-object';

// TODO: Add tokens from Rodeo
// const tokens = transformTokensObject(useRodeoTokensStore.getState().tokens);

const tokens = Config.SWAP_TOKENS;
export const initialBalances = tokens.reduce<
  Record<string, ethers.BigNumber>[]
>((acc, token) => {
  acc.push({ [token.address]: ethers.BigNumber.from(0) });
  return acc;
}, []);
