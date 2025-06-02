import { useEffect, useMemo } from 'react';
import { Spacer, SafeViewContainer } from '@components/atoms';
import { TotalBalance } from '@components/atoms/total-balance';
import { AccountActionsContainer } from '@components/molecules';
import { HomeHeader, TokensList } from '@components/organisms';
import { useWalletStore } from '@core/wallets';
import { verticalScale } from '@utils';

export const HomeScreen = () => {
  const { selectedWalletTokens, calculateTotalUsdBalance } = useWalletStore();

  const totalBalance = useMemo(
    () => calculateTotalUsdBalance(selectedWalletTokens),
    [calculateTotalUsdBalance, selectedWalletTokens]
  );

  useEffect(() => {
    // TODO: Add refresh logic
  }, []);

  return (
    <SafeViewContainer>
      <HomeHeader />
      <Spacer value={verticalScale(24)} />
      <TotalBalance totalBalance={totalBalance} />
      <Spacer value={verticalScale(32)} />
      <AccountActionsContainer />
      <Spacer value={verticalScale(32)} />
      <TokensList />
    </SafeViewContainer>
  );
};
