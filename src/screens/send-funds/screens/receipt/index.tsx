import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  KeyboardDismissingView,
  SafeViewContainer,
  Typography
} from '@components/atoms';
import {
  AddressInputWithQR,
  Header,
  PrimaryButton
} from '@components/molecules';
import {
  ReceipientContactsSelector,
  WalletSelector
} from '@components/templates';
import { COLORS, FLEX_FULL_SIZE, FONT_SIZE } from '@constants';
import { Contact } from '@core/contacts/types';
import { useRecipientFormHandler } from '@core/send-funds/lib';
import { useSendFundsStore } from '@core/send-funds/model';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { NumberUtils } from '@utils';
import { styles } from './styles';

export const SendFundsReceiptScreen = ({
  route
}: RootNavigationScreenProps<'SendFundsReceiptScreen'>) => {
  const { t } = useTranslation();
  const {
    params: { token }
  } = route;

  const { amount, receipient, setReceipient } = useSendFundsStore();
  const { error, isWrongValue } = useRecipientFormHandler();

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

  const onRecepientContactPress = useCallback(
    (contact: Contact) => {
      setReceipient(contact.address);
    },
    [setReceipient]
  );

  const disabled = useMemo(() => !receipient, [receipient]);

  return (
    <SafeViewContainer>
      <Header title="Receipt" contentCenter={renderHeaderContentMiddle} />

      <KeyboardDismissingView style={FLEX_FULL_SIZE}>
        <View style={styles.container}>
          <AddressInputWithQR
            label="Send To"
            value={receipient}
            onChangeText={setReceipient}
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

        <ReceipientContactsSelector onContactPress={onRecepientContactPress} />

        <View style={styles.buttonContainer}>
          <PrimaryButton disabled={disabled} onPress={() => {}}>
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest600SemiBold"
              color={COLORS.white}
            >
              {t('buttons.review')}
            </Typography>
          </PrimaryButton>
        </View>
      </KeyboardDismissingView>
    </SafeViewContainer>
  );
};
