import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import { RowContainer, Spacer, Spinner, Typography } from '@components/atoms';
import { COLORS, ETH_DECIMALS, KEYBOARD_OPENING_TIME } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import {
  useSwapActions,
  useSwapBalance,
  useSwapBetterCurrency,
  useSwapFieldsHandler
} from '@core/dex/lib/hooks';
import { FIELD, SelectedTokensKeys } from '@core/dex/types';
import { NumberUtils, scale } from '@utils';

interface BalanceProps {
  type: SelectedTokensKeys;
  setIsBalanceLoading: Dispatch<SetStateAction<boolean>>;
}

export const Balance = ({ type, setIsBalanceLoading }: BalanceProps) => {
  const { t } = useTranslation();

  const {
    selectedTokens,
    selectedTokensAmount,
    setSelectedTokensAmount,
    setIsExactIn,
    isExecutingPrice,
    setIsInsufficientBalance,
    isExtractingMaxPrice,
    setIsExtractingMaxPrice,
    isPoolsLoading
  } = useSwapContextSelector();
  const { onSelectMaxTokensAmount, updateReceivedTokensOutput } =
    useSwapFieldsHandler();

  const { swapCallback } = useSwapActions();

  const { bestTradeCurrency } = useSwapBetterCurrency();
  const { bnBalanceAmount, isFetchingBalance } = useSwapBalance(
    selectedTokens[type]
  );

  useEffect(() => {
    setIsBalanceLoading(isFetchingBalance);
  }, [isFetchingBalance, setIsBalanceLoading]);

  const normalizedTokenBalance = useMemo(() => {
    if (bnBalanceAmount) {
      return NumberUtils.limitDecimalCount(
        ethers.utils.formatEther(bnBalanceAmount?._hex),
        2
      );
    }

    return '';
  }, [bnBalanceAmount]);

  const onSelectMaxTokensAmountPress = useCallback(async () => {
    setIsExtractingMaxPrice(true);
    setIsExactIn(type === FIELD.TOKEN_A);

    if (!bnBalanceAmount) return;

    try {
      setTimeout(async () => {
        const parsedBalance = ethers.utils.formatEther(bnBalanceAmount);

        const isNative =
          type === FIELD.TOKEN_A &&
          selectedTokens.TOKEN_A.address === ethers.constants.AddressZero;

        if (isNative) {
          const bnAmountToReceive = await bestTradeCurrency(parsedBalance, [
            selectedTokens.TOKEN_A.address,
            selectedTokens.TOKEN_B.address
          ]);

          const estimatedGas = await swapCallback({
            amountIn: parsedBalance,
            amountOut: ethers.utils.formatEther(bnAmountToReceive),
            estimateGas: true,
            tradeIn: type === FIELD.TOKEN_A
          });

          const maxSpendableAmount = bnBalanceAmount.sub(estimatedGas);

          if (maxSpendableAmount.lt(0)) {
            setIsInsufficientBalance(true);
            setSelectedTokensAmount({
              [FIELD.TOKEN_A]: '0',
              [FIELD.TOKEN_B]: ''
            });
            return;
          }

          const amount = NumberUtils.limitDecimalCount(
            ethers.utils.formatEther(maxSpendableAmount),
            ETH_DECIMALS
          );

          onSelectMaxTokensAmount(type, amount);
        } else {
          const amount = NumberUtils.limitDecimalCount(
            ethers.utils.formatEther(bnBalanceAmount),
            ETH_DECIMALS
          );

          onSelectMaxTokensAmount(type, amount);
        }

        setTimeout(() => {
          updateReceivedTokensOutput();
        });
      }, KEYBOARD_OPENING_TIME);
    } catch (error) {
      throw error;
    } finally {
      setIsExtractingMaxPrice(false);
    }
  }, [
    bestTradeCurrency,
    bnBalanceAmount,
    onSelectMaxTokensAmount,
    selectedTokens.TOKEN_A.address,
    selectedTokens.TOKEN_B.address,
    setIsExactIn,
    setIsExtractingMaxPrice,
    setIsInsufficientBalance,
    setSelectedTokensAmount,
    swapCallback,
    type,
    updateReceivedTokensOutput
  ]);

  const disabled = useMemo(() => {
    return bnBalanceAmount?.isZero() || !selectedTokens[type];
  }, [bnBalanceAmount, selectedTokens, type]);

  const maximumTokenBalance = useMemo(() => {
    return !selectedTokens[type] ? '0' : normalizedTokenBalance;
  }, [normalizedTokenBalance, selectedTokens, type]);

  const error = useMemo(() => {
    if (
      type === FIELD.TOKEN_B ||
      !bnBalanceAmount ||
      !selectedTokensAmount[FIELD.TOKEN_A] ||
      !isFetchingBalance ||
      !isPoolsLoading
    )
      return false;

    const bnInputBalance = bnBalanceAmount?._hex;
    const bnSelectedAmount = ethers.utils.parseEther(
      selectedTokensAmount[FIELD.TOKEN_A]
    );

    return bnSelectedAmount.gt(bnInputBalance);
  }, [
    bnBalanceAmount,
    isFetchingBalance,
    isPoolsLoading,
    selectedTokensAmount,
    type
  ]);

  return (
    <RowContainer alignItems="center" justifyContent="space-between">
      <RowContainer alignItems="center">
        <RowContainer alignItems="center">
          <Spacer horizontal value={4} />
          {isFetchingBalance || isPoolsLoading ? (
            // <ShimmerLoader width={45} height={12} />
            <Spinner size="small" />
          ) : (
            <Typography
              fontSize={14}
              fontFamily="Onest500Medium"
              color={COLORS[error ? 'destructive500' : 'neutral500']}
            >
              {maximumTokenBalance}
            </Typography>
          )}
        </RowContainer>

        {!disabled && type !== FIELD.TOKEN_B && (
          <>
            <Spacer horizontal value={scale(4)} />
            {/* <Button
              disabled={
                isExecutingPrice || isExtractingMaxPrice || isPoolsLoading
              }
              onPress={onSelectMaxTokensAmountPress}
            >
              <Typography
                fontSize={15}
                fontFamily="Onest500Medium"
                color={COLORS.primary600}
              >
                {t('swap.text.button.max')}
              </Typography>
            </Button> */}
          </>
        )}
      </RowContainer>
    </RowContainer>
  );
};
