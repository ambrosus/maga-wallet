import { useEffect, useMemo } from 'react';
import { Typography, Spacer, SafeViewContainer } from '@components/atoms';
import { AccountActionsContainer } from '@components/molecules';
import { HomeHeader, TokensList } from '@components/organisms';
import { COLORS } from '@constants';
import { useWalletStore } from '@core/wallets';
import { NumberUtils, verticalScale } from '@utils';
import { styles } from './styles';

export const HomeScreen = () => {
  const { initializeWallets, selectedWalletTokens, calculateTotalUsdBalance } =
    useWalletStore();

  const totalBalance = useMemo(
    () => calculateTotalUsdBalance(selectedWalletTokens),
    [calculateTotalUsdBalance, selectedWalletTokens]
  );

  const TotalBalance = () => {
    const _totalBalance = NumberUtils.limitDecimalCount(totalBalance, 2)
      .toString()
      .split('.');
    return (
      <>
        <Typography
          fontSize={36}
          fontFamily="Onest600SemiBold"
          color={COLORS.neutral700}
        >
          ${NumberUtils.formatNumber(_totalBalance[0] ? +_totalBalance[0] : 0)}
          <Typography
            fontSize={36}
            fontFamily="Onest600SemiBold"
            color={COLORS.textTertiary}
          >
            .
            {NumberUtils.formatNumber(_totalBalance[1] ? +_totalBalance[1] : 0)}
          </Typography>
        </Typography>
      </>
    );
  };

  useEffect(() => {
    initializeWallets();
  }, [initializeWallets]);

  return (
    <SafeViewContainer style={styles.container}>
      <HomeHeader />
      <Spacer value={verticalScale(24)} />
      <TotalBalance />
      <Spacer value={verticalScale(32)} />
      <AccountActionsContainer />
      <Spacer value={verticalScale(24)} />
      <TokensList />
    </SafeViewContainer>
  );
};
