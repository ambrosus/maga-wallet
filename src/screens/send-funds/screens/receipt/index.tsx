import { useMemo } from 'react';
import { View } from 'react-native';
import {
  KeyboardDismissingView,
  SafeViewContainer,
  Typography
} from '@components/atoms';
import { AddressInputWithQR, Header } from '@components/molecules';

import { WalletSelector } from '@components/templates';
import { COLORS, FLEX_FULL_SIZE, FONT_SIZE } from '@constants';
import { useRecipientFormHandler } from '@core/send-funds/lib';
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
  const { error, isWrongValue, recipient, setRecipient } =
    useRecipientFormHandler();

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

      <KeyboardDismissingView style={FLEX_FULL_SIZE}>
        <View style={styles.container}>
          <AddressInputWithQR
            label="Send To"
            value={recipient}
            onChangeText={setRecipient}
          />

          {isWrongValue && error && (
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.destructive500}
            >
              {error}
            </Typography>
          )}
        </View>
      </KeyboardDismissingView>
    </SafeViewContainer>
  );
};
