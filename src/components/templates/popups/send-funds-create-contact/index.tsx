import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { t } from 'i18next';
import {
  KeyboardDismissingView,
  Popup,
  RowContainer,
  Typography
} from '@components/atoms';
import {
  PrimaryButton,
  SecondaryButton,
  TextInputWithLabel,
  TextOrSpinner
} from '@components/molecules';
import { FONT_SIZE, COLORS } from '@constants';
import { Contact } from '@core/contacts/types';
import { useSendFundsStore } from '@core/send-funds/model';
import { StringUtils } from '@utils';
import { styles } from './styles';

interface SendFundsCreateContactPopupProps {
  visible: boolean;
  onClose: () => void;
  createContact: UseMutateAsyncFunction<Contact, Error, Contact, unknown>;
  loading: boolean;
}

export const SendFundsCreateContactPopup = ({
  visible,
  onClose,
  createContact,
  loading
}: SendFundsCreateContactPopupProps) => {
  const { receipient } = useSendFundsStore();
  const [username, setUsername] = useState<string>('');

  const onChangeUsername = (value: string) => {
    setUsername(value);
  };

  const onCreateContact = useCallback(async () => {
    await createContact({
      _id: Math.random(),
      name: username,
      address: receipient
    });

    onClose();
  }, [createContact, onClose, receipient, username]);

  return (
    <Popup visible={visible} onClose={onClose}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
        <KeyboardDismissingView>
          <View style={styles.container}>
            <Typography
              fontSize={FONT_SIZE.heading.lg}
              fontFamily="Onest600SemiBold"
              color={COLORS.textPrimary}
            >
              {t('send.status.success.buttons.save.contact')}
            </Typography>

            <View style={styles.formContainer}>
              <TextInputWithLabel
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                label="Name"
                placeholder="e.g Seth"
                value={username}
                onChangeText={onChangeUsername}
              />
              <TextInputWithLabel
                editable={false}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                label="Wallet address"
                placeholder="0x8934d54e5ddu6...B32a"
                value={StringUtils.formatAddress(
                  receipient,
                  receipient.length - 27,
                  4
                )}
              />
            </View>

            <RowContainer
              alignItems="center"
              justifyContent="space-between"
              gap={16}
            >
              <SecondaryButton
                style={styles.button}
                onPress={onClose}
                disabled={loading}
              >
                <Typography
                  fontSize={FONT_SIZE.body.lg}
                  fontFamily="Onest600SemiBold"
                  color={COLORS.neutral700}
                >
                  Cancel
                </Typography>
              </SecondaryButton>

              <PrimaryButton
                style={styles.button}
                disabled={loading}
                onPress={onCreateContact}
              >
                <TextOrSpinner
                  loading={loading}
                  spinnerColor={COLORS.white}
                  label="Save"
                  styles={{
                    active: {
                      fontSize: FONT_SIZE.body.lg,
                      fontFamily: 'Onest600SemiBold',
                      color: COLORS.white
                    }
                  }}
                />
              </PrimaryButton>
            </RowContainer>
          </View>
        </KeyboardDismissingView>
      </KeyboardAvoidingView>
    </Popup>
  );
};
