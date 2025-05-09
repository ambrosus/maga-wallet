import { CryptoCurrencyCode } from '@constants';
import { SwapStringUtils } from '@core/dex/utils';
import { toUpper } from 'lodash';

export interface TokenInfo {
  address?: string;
  name: string;
  symbol: CryptoCurrencyCode | string;
}

interface TokenExtendProps {
  tokenNameFromDatabase: string | 'unknown';
  symbol: string;
}

export const getTokenNameFromDatabase = (address: string): string => 'unknown';
//   Config.ALL_TOKENS.find(
//     (token: DatabaseTokenModel) => token.address === address
//   )?.name ?? 'unknown';

// export const getTokenSymbolFromDatabase = (
//   address: string,
//   _toUpperCase?: boolean
// ): string =>
//   Config.ALL_TOKENS.find(
//     (token: DatabaseTokenModel) =>
//       (_toUpperCase ? toUpper(token.address) : token.address) === address
//   )?.symbol ?? 'unknown';

export function wrapTokenIcon<T extends TokenExtendProps>(token: T) {
  if (token.symbol === CryptoCurrencyCode.AMB) {
    return 'AirDAO';
  }

  const { tokenNameFromDatabase } = token;

  const isTokenNameFromDBExist =
    tokenNameFromDatabase && tokenNameFromDatabase !== 'unknown';

  return SwapStringUtils.extendedLogoVariants(
    token[isTokenNameFromDBExist ? 'tokenNameFromDatabase' : 'symbol'] ?? ''
  );
}

const truncatePoolTokenName = (token: string) => {
  return token.split(' ')[0];
};

const getTokenDetails = (address: string): Promise<TokenInfo> | TokenInfo => {
  const currentToken =
    [].find((t: { address: string }) => t.address === address) || null;

  if (!currentToken)
    return {
      name: address,
      symbol: ''
    };

  return currentToken;
};

export const TokenUtils = {
  getTokenDetails,
  truncatePoolTokenName,
  getTokenNameFromDatabase
};
