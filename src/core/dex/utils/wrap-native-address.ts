import { zeroAddress } from 'viem';
import { Config } from '@constants';
import { environment } from '@utils';
import { TOKEN_ADDRESSES } from '../entities';
import { SwapToken } from '../types';

export const addresses = TOKEN_ADDRESSES[environment];

export function isNativeWrapped(path: string[]) {
  const wrappedPath = Config.SWAP_TOKENS.find(
    (token: SwapToken) => token.symbol === 'SAMB'
  )?.address;

  return path[0] === wrappedPath && path[1] === wrappedPath;
}

export function wrapNativeAddress(path: string[]): [string, string] {
  const nativeAddress = zeroAddress;

  const replacementAddress =
    Config.SWAP_TOKENS.find((token: SwapToken) => token.symbol === 'SAMB')
      ?.address ?? '';

  return path.map((token) =>
    token === nativeAddress ? replacementAddress : token
  ) as [string, string];
}

export function wrapNativeToken(token: SwapToken) {
  return token.address === zeroAddress
    ? { name: 'SAMB', symbol: 'SAMB', address: addresses.SAMB }
    : token;
}

export function isETHtoWrapped(path: Array<string | undefined>) {
  return path[0] === zeroAddress && path[1] === addresses.SAMB;
}

export function isWrappedToETH(path: Array<string | undefined>) {
  return path[0] === addresses.SAMB && path[1] === zeroAddress;
}
