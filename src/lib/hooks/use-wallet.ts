import { useMemo } from 'react';
import { ethers } from 'ethers';
import { createAMBProvider } from '@lib/crypto';

export const useWallet = () => {
  const privateKey = useMemo(() => process.env.MOCK_PRIVATE_KEY ?? '', []);

  const wallet = useMemo(() => {
    return new ethers.Wallet(privateKey, createAMBProvider());
  }, [privateKey]);

  return {
    privateKey,
    wallet
  };
};
