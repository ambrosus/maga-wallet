import { useCallback } from 'react';
import { ethers } from 'ethers';
import { ETH_DECIMALS, CryptoCurrencyCode } from '@constants';
import { getBalanceOfAddress } from '@lib/crypto';
import { Token } from '@models/token';
import { TokenUtils } from '@utils';

export const useNativeCurrency = () => {
  const createNativeCurrencyInstance = useCallback(async (address: string) => {
    const tokenBalance = await getBalanceOfAddress(address);

    return new Token(
      {
        name: 'AirDAO',
        address: address ?? '',
        isNativeCoin: true,
        balance: {
          wei: tokenBalance.wei.toString(),
          ether: Number(tokenBalance.ether) || 0,
          formattedBalance: ethers.utils.formatUnits(
            tokenBalance.wei,
            ETH_DECIMALS
          )
        },
        symbol: CryptoCurrencyCode.AMB,
        decimals: ETH_DECIMALS,
        tokenNameFromDatabase: 'AirDAO'
      },
      TokenUtils
    );
  }, []);

  return { createNativeCurrencyInstance };
};
