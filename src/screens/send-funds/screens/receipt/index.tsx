import { useMemo, useRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SafeViewContainer, Typography } from '@components/atoms';
import { Header, HomeHeaderButton } from '@components/molecules';
import { COLORS, FONT_SIZE } from '@constants';
import { useSendFundsStore } from '@core/send-funds/model';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { NumberUtils } from '@utils';

export const SendFundsReceiptScreen = ({
  route
}: RootNavigationScreenProps<'SendFundsReceiptScreen'>) => {
  const bottomSheetWalletSelectorRef = useRef<BottomSheetModal>(null);
  const {
    params: { token }
  } = route;

  const { amount } = useSendFundsStore();
  const renderHeaderContentMiddle = useMemo(() => {
    return (
      <View>
        <Typography
          fontSize={FONT_SIZE.body.lg}
          fontFamily="Onest600SemiBold"
          color={COLORS.primary500}
        >
          {NumberUtils.limitDecimalCount(amount, 5)} {token.currencyCode}
        </Typography>

        <HomeHeaderButton
          onPress={() => bottomSheetWalletSelectorRef.current?.present()}
          title="Select Wallet"
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
