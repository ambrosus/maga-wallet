import { useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { useSwapContextSelector } from '@core/dex/context';
import { createAMBProvider } from '@core/dex/utils/contracts/instances';
import { devLogger } from '@utils';
import { useAllLiquidityPools } from './use-all-liquidity-pools';
import { PAIR } from '../abi';
import { useSwapFieldsHandler } from './use-swap-fields-handler';

export const useTradePriceListener = () => {
  const { selectedTokens } = useSwapContextSelector();
  const { getPairAddress } = useAllLiquidityPools();
  const { updateReceivedTokensOutput } = useSwapFieldsHandler();
  const lastUpdateTimeRef = useRef<number>(0);
  const pairContractRef = useRef<ethers.Contract | null>(null);

  useEffect(() => {
    const { TOKEN_A, TOKEN_B } = selectedTokens;

    if (!TOKEN_A || !TOKEN_B) return;

    const pair = getPairAddress({
      TOKEN_A,
      TOKEN_B
    });

    if (!pair?.pairAddress) return;

    const provider = createAMBProvider();
    const pairContract = new ethers.Contract(pair.pairAddress, PAIR, provider);
    pairContractRef.current = pairContract;

    const handleSwap = async (...args: any[]) => {
      if (args[6].address !== pair.pairAddress) return;

      devLogger('Swap detected', args);

      const now = Date.now();
      // Prevent updates more frequently than every 2 seconds
      if (now - lastUpdateTimeRef.current < 2000) {
        devLogger('Skipping update - too frequent');
        return;
      }

      devLogger('Swap detected, updating price', {
        pairAddress: pair.pairAddress,
        timestamp: now
      });

      lastUpdateTimeRef.current = now;
      await updateReceivedTokensOutput();
    };

    pairContract.on('Swap', handleSwap);

    return () => {
      if (pairContractRef.current) {
        pairContractRef.current.removeAllListeners('Swap');
        pairContractRef.current = null;
      }
    };
  }, [getPairAddress, selectedTokens, updateReceivedTokensOutput]);

  useEffect(() => {
    return () => {
      if (pairContractRef.current) {
        pairContractRef.current.removeAllListeners('Swap');
        pairContractRef.current = null;
      }
    };
  }, []);
};
