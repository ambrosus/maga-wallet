import { useMemo } from 'react';
import { View } from 'react-native';
import { SafeViewContainer, Typography } from '@components/atoms';
import { Header } from '@components/molecules';
import { WalletSelector } from '@components/templates';
import { COLORS, FONT_SIZE } from '@constants';
import { useSendFundsStore } from '@core/send-funds/model';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { NumberUtils } from '@utils';
import { styles } from './styles';

export const SendFundsReceiptScreen = ({
  route
}: RootNavigationScreenProps<'SendFundsReceiptScreen'>) => {
  const {
    params: { token }
  } = route;

  const { amount } = useSendFundsStore();
  const renderHeaderContentMiddle = useMemo(() => {
    return (
      <View style={styles.headerContentMiddle}>
        <Typography
          fontSize={FONT_SIZE.body.lg}
          fontFamily="Onest600SemiBold"
          color={COLORS.primary500}
        >
          {NumberUtils.limitDecimalCount(amount, 5)} {token.currencyCode}
        </Typography>

        <WalletSelector
          bottomSheetTitle="Switch Accounts"
          containerStyle={styles.walletSelector}
        />
      </View>
    );
  }, [amount, token.currencyCode]);

  return (
    <SafeViewContainer>
      <Header title="Receipt" contentCenter={renderHeaderContentMiddle} />
    </SafeViewContainer>
  );
};
