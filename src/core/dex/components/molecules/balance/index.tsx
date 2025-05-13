import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import {
  RowContainer,
  ShimmerLoader,
  Spacer,
  Typography
} from '@components/atoms';
import { COLORS, FONT_SIZE } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { FIELD, SelectedTokensKeys } from '@core/dex/types';
import { NumberUtils } from '@utils';

interface BalanceProps {
  readonly bnBalanceAmount: ethers.BigNumber | null;
  readonly isFetchingBalance: boolean;
  type: SelectedTokensKeys;
  setIsBalanceLoading: Dispatch<SetStateAction<boolean>>;
}

export const Balance = ({
  bnBalanceAmount,
  isFetchingBalance,
  type,
  setIsBalanceLoading
}: BalanceProps) => {
  const { t } = useTranslation();

  const { selectedTokens, selectedTokensAmount, isPoolsLoading } =
    useSwapContextSelector();

  useEffect(() => {
    setIsBalanceLoading(isFetchingBalance);
  }, [isFetchingBalance, setIsBalanceLoading]);

  const normalizedTokenBalance = useMemo(() => {
    if (bnBalanceAmount) {
      return NumberUtils.limitDecimalCount(
        ethers.utils.formatEther(bnBalanceAmount),
        2
      );
    }

    return '';
  }, [bnBalanceAmount]);

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
        <Spacer horizontal value={4} />
        {isFetchingBalance || isPoolsLoading ? (
          <ShimmerLoader width={45} height={12} />
        ) : (
          <Typography
            fontSize={FONT_SIZE.body.sm}
            fontFamily="Onest500Medium"
            color={COLORS[error ? 'destructive500' : 'neutral500']}
          >
            {t('common.balance')}: {maximumTokenBalance}
          </Typography>
        )}
      </RowContainer>
    </RowContainer>
  );
};
