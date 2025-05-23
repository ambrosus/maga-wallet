import { useCallback } from 'react';
import { Alert } from 'react-native';
import { Config } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { PAIR, FACTORY_ABI } from '@core/dex/lib/abi';
import { SelectedTokensState } from '@core/dex/types';
import { wrapNativeAddress } from '@core/dex/utils';
import { createRpcProvider } from '@lib';
import { devLogger } from '@utils';

export function useAllLiquidityPools() {
  const { setPairs, allPairsRef, setIsPoolsLoading } = useSwapContextSelector();

  const getAllPoolsCount = useCallback(async () => {
    setIsPoolsLoading(true);
    const results = [];

    try {
      const client = createRpcProvider();

      const pairCount = await client.readContract({
        abi: FACTORY_ABI,
        functionName: 'allPairsLength',
        address: Config.FACTORY_ADDRESS as `0x${string}`
      });

      const totalPairs = Number(pairCount);

      const batchSize = 50;
      let allPairs: Array<{
        pairAddress: string;
        token0: string;
        token1: string;
      }> = [];

      for (
        let batchStart = 0;
        batchStart < totalPairs;
        batchStart += batchSize
      ) {
        const batchEnd = Math.min(batchStart + batchSize, totalPairs);

        const batchPromises = Array.from(
          { length: batchEnd - batchStart },
          async (_, index) => {
            const i = batchStart + index;
            try {
              const pairAddress = await client.readContract({
                abi: FACTORY_ABI,
                functionName: 'allPairs',
                address: Config.FACTORY_ADDRESS as `0x${string}`,
                args: [BigInt(i)]
              });

              try {
                const [token0, token1] = await Promise.all([
                  client.readContract({
                    abi: PAIR,
                    functionName: 'token0',
                    address: pairAddress as `0x${string}`
                  }),
                  client.readContract({
                    abi: PAIR,
                    functionName: 'token1',
                    address: pairAddress as `0x${string}`
                  })
                ]);

                return {
                  pairAddress: pairAddress as string,
                  token0: (token0 as string).toLowerCase(),
                  token1: (token1 as string).toLowerCase()
                };
              } catch (tokenError) {
                devLogger(
                  `Error fetching tokens for pair ${pairAddress}:`,
                  tokenError
                );
                throw tokenError;
              }
            } catch (error) {
              if (__DEV__) {
                Alert.alert(
                  `Error fetching pair at index ${i}:`,
                  JSON.stringify(error)
                );
              }
              return null;
            }
          }
        );

        const batchResults = await Promise.all(batchPromises);

        const validResults = batchResults.filter(
          (
            result
          ): result is {
            pairAddress: string;
            token0: string;
            token1: string;
          } => result !== null
        );

        allPairs = [...allPairs, ...validResults];
        results.push(...validResults);

        setPairs(allPairs);

        devLogger('Batch processed', {
          batchStart,
          batchEnd,
          currentTotal: allPairs.length,
          expectedTotal: totalPairs
        });
      }

      if (__DEV__) {
        Alert.alert(
          'Successfully loaded liquidity pools',
          `Successfully loaded ${allPairs.length} of ${totalPairs} pairs`
        );
      }

      return allPairs;
    } catch (error) {
      if (__DEV__) {
        Alert.alert(
          'Error fetching liquidity pools count:',
          JSON.stringify(error)
        );
      }

      if (results.length > 0) {
        return results;
      }

      return allPairsRef.current;
    } finally {
      setIsPoolsLoading(false);
    }
  }, [setPairs, setIsPoolsLoading, allPairsRef]);

  const getPairAddress = useCallback(
    (selectedTokens: SelectedTokensState) => {
      const { TOKEN_A, TOKEN_B } = selectedTokens;
      if (TOKEN_A && TOKEN_B) {
        const [addressFrom, addressTo] = wrapNativeAddress([
          TOKEN_A?.address ?? '',
          TOKEN_B?.address ?? ''
        ]);

        const targetSet = new Set([
          addressFrom.toLowerCase(),
          addressTo.toLowerCase()
        ]);

        return allPairsRef.current.find((pair) => {
          const pairSet = new Set([
            pair.token0.toLowerCase(),
            pair.token1.toLowerCase()
          ]);
          return (
            targetSet.size === pairSet.size &&
            [...targetSet].every((value) => pairSet.has(value))
          );
        });
      }
    },
    [allPairsRef]
  );

  const getReserves = useCallback(
    async (pairAddress: string, selectedTokens: SelectedTokensState) => {
      const mapper = getPairAddress(selectedTokens);
      const client = createRpcProvider();

      const reserves = (await client.readContract({
        address: pairAddress as `0x${string}`,
        abi: PAIR,
        functionName: 'getReserves'
      })) as [bigint, bigint, number];

      const { TOKEN_A, TOKEN_B } = selectedTokens;

      const [addressFrom, addressTo] = wrapNativeAddress([
        TOKEN_A?.address ?? '',
        TOKEN_B?.address ?? ''
      ]);

      const isTokenAFirst =
        mapper?.token0 === addressFrom && mapper?.token1 === addressTo;

      const reserveIn = isTokenAFirst ? reserves[0] : reserves[1];
      const reserveOut = isTokenAFirst ? reserves[1] : reserves[0];

      return { reserveIn, reserveOut };
    },
    [getPairAddress]
  );

  return {
    getAllPoolsCount,
    getPairAddress,
    getReserves
  };
}
